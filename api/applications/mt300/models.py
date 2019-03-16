from django.db import models
from django.db.models import Q
from applications.mt300.contants import MINIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT, MAXIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT
from applications.mt300.conf_file import FIELDS_CONSIDERED_FOR_CLOSE_FIT
from pprint import pprint


STATUS_CHOICES = (
    ('matched', 'Matched'),
    ('unmatched', 'Un-matched'),
    ('closefit', 'CloseFit'),
    ('under-review', 'Under Review'),
    ('unreviewed', 'Unreviewed')
)

class BaseMessageModel(models.Model):

    tag = models.CharField(max_length=200, blank=True)

    # mandatory sequence A General Information
    c_20 = models.CharField(max_length=20, verbose_name='our reference')
    c_21 = models.CharField(max_length=20, verbose_name='previous reference', null=True)
    c_22A = models.CharField(max_length=10, verbose_name='type of operation', null=True)
    c_22C = models.CharField(max_length=20, verbose_name='common reference', null=True)
    c_94A = models.CharField(max_length=30, verbose_name='scope of operation', null=True)
    c_82 = models.CharField(max_length=20, verbose_name='party a')
    c_87 = models.CharField(max_length=20, verbose_name='party b')
    c_77H = models.DateField(verbose_name='isda date')
    c_52A = models.CharField(max_length=20, null=True, verbose_name='unknown info')

    # Mandatory Sequence B Transaction Details
    c_30T = models.DateField(verbose_name='contract date')
    c_30V = models.DateField(verbose_name='value date')
    c_36 = models.DecimalField(verbose_name='exchange_rate', max_digits=20, decimal_places=2)

    # Mandatory Subsequence B1 Amount Bought or Sold
    ### Converting c_32a into two fields for currency and amount separately
    c_32B_fi = models.CharField(max_length=5, verbose_name='currency to buy')
    c_32B_se = models.DecimalField(verbose_name='amount of currency to buy', max_digits=20, decimal_places=2)

    c_33B_fi = models.CharField(max_length=5, verbose_name='currency to sell')
    c_33B_se = models.DecimalField(verbose_name='amount of currency to sell', max_digits=20, decimal_places=2)

    c_53 = models.CharField(max_length=20, verbose_name='delivery agent')
    c_56 = models.CharField(max_length=20, verbose_name='intermediary', null=True)
    c_57 = models.CharField(max_length=20, verbose_name='settlement')
    c_58 = models.CharField(max_length=20, verbose_name='beneficiary')

    status = models.CharField(max_length=30, default='unmatched', choices=STATUS_CHOICES)

    class Meta:
        abstract = True

    @property
    def c_32B(self):
        return f'{self.c_32B_fi} {self.c_32B_se}'

    @property
    def c_33B(self):
        return f'{self.c_33B_fi} {self.c_33B_se}'

    @staticmethod
    def update_status(instance, status):
        instance.status = status
        instance.save()

    @staticmethod
    def get_number_of_matching_fields(instance_one, instance_two):
        number_of_matches = 0
        for field in FIELDS_CONSIDERED_FOR_CLOSE_FIT:
            value_first_instance = getattr(instance_one, field)
            value_second_instance = getattr(instance_two, field)

            if value_first_instance == value_second_instance:
                number_of_matches += 1

        return number_of_matches


class MessageCP(BaseMessageModel):

    @staticmethod
    def get_matching_cp_messages(sg_message):
        return MessageCP.objects.filter(Q(status='unmatched') & Q(c_82=sg_message.c_87) & Q(c_87=sg_message.c_82)
            & Q(c_77H=sg_message.c_77H) & Q(c_30V=sg_message.c_30V) & Q(c_36=sg_message.c_36) & Q(c_32B_fi=sg_message.c_33B_fi)
            & Q(c_33B_fi=sg_message.c_32B_fi) & Q(c_32B_se=sg_message.c_33B_se) & Q(c_33B_se=sg_message.c_32B_se)).order_by('-c_77H')
            # & Q(c_56=sg_message.c_56) & Q(c_57=sg_message.c_57) & Q(c_58=sg_message.c_58)


    @staticmethod
    def get_closefit_cp_messages(sg_message):
        possible_close_fits = MessageCP.objects.filter(Q(status='unmatched'), Q(c_82=sg_message.c_87), Q(c_87=sg_message.c_82),
            Q(c_77H=sg_message.c_77H), Q(c_30T=sg_message.c_30T), ~Q(c_30V=sg_message.c_30V)
            | ~Q(c_36=sg_message.c_36) | ~Q(c_32B_fi=sg_message.c_33B_fi)
            | ~Q(c_33B_fi=sg_message.c_32B_fi) | ~Q(c_32B_se=sg_message.c_33B_se) | ~Q(c_33B_se=sg_message.c_32B_se)).order_by('-c_77H')
            # & Q(c_56=sg_message.c_56) & Q(c_57=sg_message.c_57) & Q(c_58=sg_message.c_58)

        close_fits = []
        for possible_cf in possible_close_fits:
            matched_fields = MessageSG.get_number_of_matching_fields(sg_message, possible_cf)
            if matched_fields >= MINIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT \
                and matched_fields <= MAXIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT:
                close_fits.append(possible_cf)

        return close_fits

    @staticmethod
    def match_a_cp_message(message_cp):
        matched_sg_messages = MessageSG.get_matching_sg_messages(message_cp)
        best_match = None

        if matched_sg_messages:
            best_match = matched_csg_messages.first()

            MessageCP.update_status(message_cp, 'matched')
            MessageSG.update_status(best_match, 'matched')

            OneToOneMatches.create_matched_entry(best_match, message_cp)

    @staticmethod
    def match_all_cp_messages():
        all_unmatched_messages = MessageCP.objects.filter(Q(status='unmatched'))
        for message_cp in all_unmatched_messages:
            MessageCP.match_a_cp_message(message_cp)

    @staticmethod
    def get_closefit_for_a_cp_message(message_cp):
        closefit_sg_messages = MessageSG.get_closefit_sg_messages(message_cp)
        best_match = None
        
        if closefit_sg_messages:
            best_match = closefit_sg_messages[0]

            MessageCP.update_status(message_cp, 'closefit')
            MessageSG.update_status(best_match, 'closefit')

            CloseFitMatches.create_closefit_entry(best_match, message_cp)

    @staticmethod
    def process_all_closefit_cp_messages():
        all_unmatched_messages = MessageCP.objects.filter(Q(status='unmatched'))
        for message_cp in all_unmatched_messages:
            MessageCP.get_closefit_for_a_cp_message(message_cp)


class MessageSG(BaseMessageModel):

    @staticmethod
    def get_matching_sg_messages(cp_message):
        return MessageSG.objects.filter(Q(status='unmatched') & Q(c_82=cp_message.c_87) & Q(c_87=cp_message.c_82)
            & Q(c_77H=cp_message.c_77H) & Q(c_30T=cp_message.c_30T) & Q(c_30V=cp_message.c_30V) & Q(c_36=cp_message.c_36)
            & Q(c_32B_fi=cp_message.c_33B_fi)
            & Q(c_33B_fi=cp_message.c_32B_fi) & Q(c_32B_se=cp_message.c_33B_se) & Q(c_33B_se=cp_message.c_32B_se)).order_by('-c_77H')
            # & Q(c_56=cp_message.c_56) & Q(c_57=cp_message.c_57) & Q(c_58=cp_message.c_58)

    @staticmethod
    def get_closefit_sg_messages(cp_message):
        possible_close_fits =  MessageSG.objects.filter(Q(status='unmatched'), Q(c_82=cp_message.c_87), Q(c_87=cp_message.c_82),
            Q(c_77H=cp_message.c_77H), Q(c_30T=cp_message.c_30T), ~Q(c_30V=cp_message.c_30V) | ~Q(c_36=cp_message.c_36) | ~Q(c_32B_fi=cp_message.c_33B_fi)
            | ~Q(c_33B_fi=cp_message.c_32B_fi) | ~Q(c_32B_se=cp_message.c_33B_se) | ~Q(c_33B_se=cp_message.c_32B_se)).order_by('-c_77H')
            # & Q(c_56=cp_message.c_56) & Q(c_57=cp_message.c_57) & Q(c_58=cp_message.c_58)

        close_fits = []
        for possible_cf in possible_close_fits:
            matched_fields = MessageSG.get_number_of_matching_fields(cp_message, possible_cf)
            if matched_fields >= MINIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT \
                and matched_fields <= MAXIMUM_NUMBER_OF_FIELDS_MATCHES_FOR_CLOSE_FIT:
                close_fits.append(possible_cf)

        return close_fits

    @staticmethod
    def match_a_sg_message(message_sg):
        matched_cp_messages = MessageCP.get_matching_cp_messages(message_sg)
        best_match = None
        
        if matched_cp_messages:
            best_match = matched_cp_messages.first()

            MessageSG.update_status(message_sg, 'matched')
            MessageCP.update_status(best_match, 'matched')

            OneToOneMatches.create_matched_entry(message_sg, best_match)

    @staticmethod
    def match_all_sg_messages():
        all_unmatched_messages = MessageSG.objects.filter(Q(status='unmatched'))
        for message_sg in all_unmatched_messages:
            MessageSG.match_a_sg_message(message_sg)

    @staticmethod
    def get_closefit_for_a_sg_message(message_sg):
        closefit_cp_messages = MessageCP.get_closefit_cp_messages(message_sg)
        best_match = None
        
        if closefit_cp_messages:
            best_match = closefit_cp_messages[0]

            MessageSG.update_status(message_sg, 'closefit')
            MessageCP.update_status(best_match, 'closefit')

            CloseFitMatches.create_closefit_entry(message_sg, best_match)

    @staticmethod
    def process_all_closefit_sg_messages():
        all_unmatched_messages = MessageSG.objects.filter(Q(status='unmatched'))
        for message_sg in all_unmatched_messages:
            MessageSG.get_closefit_for_a_sg_message(message_sg)


class OneToOneMatches(models.Model):
    sg_message = models.ForeignKey(MessageSG, on_delete=models.CASCADE)
    cp_message = models.ForeignKey(MessageCP, on_delete=models.CASCADE)
    remark = models.CharField(max_length=100, default='')

    @staticmethod
    def create_matched_entry(sg_message, cp_message):
        OneToOneMatches.objects.create(sg_message=sg_message, cp_message=cp_message, remark=f'SG Ref #: {sg_message.c_20}')

class OneToManyMatches(models.Model):
    pass


class CloseFitMatches(models.Model):
    sg_message = models.ForeignKey(MessageSG, on_delete=models.CASCADE)
    cp_message = models.ForeignKey(MessageCP, on_delete=models.CASCADE)
    remark = models.CharField(max_length=100, default='')

    @staticmethod
    def create_closefit_entry(sg_message, cp_message):
        CloseFitMatches.objects.create(sg_message=sg_message, cp_message=cp_message, remark=f'SG Ref #: {sg_message.c_20}')