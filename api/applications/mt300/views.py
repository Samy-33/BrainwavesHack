from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Q
from django.http import Http404
from applications.mt300.models import OneToOneMatches, CloseFitMatches, MessageCP, MessageSG
from applications.mt300.serializers import OneToOneMatchSerializer, PaginationSerializer, CloseFitSerializer, MessageSGSerializer
from applications.mt300.contants import DEFAULT_PAGINATION_SIZE, MAXIMUM_PAGINATION_SIZE
from dateutil.parser import parse


class ListMessageSGView(ListAPIView):
    serializer_class = MessageSGSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        request = self.request
        queryset = MessageSG.objects.all()
        
        status = request.query_params.get('status')
        trade_date_start = request.query_params.get('trade_date_start')
        trade_date_end = request.query_params.get('trade_date_end')

        settlement_date_start = request.query_params.get('settlement_date_start')
        settlement_date_end = request.query_params.get('settlement_date_end')

        fixing_date_start = request.query_params.get('fixing_date_start')
        fixing_date_end = request.query_params.get('fixing_date_end')

        buy_ccy = request.query_params.get('buy_currency')
        buy_amount_start = request.query_params.get('buy_amt_from')
        buy_amount_end = request.query_params.get('buy_amt_to')

        sell_ccy = request.query_params.get('sell_currency')
        sell_amount_start = request.query_params.get('sell_amt_from')
        sell_amount_end = request.query_params.get('sell_amt_to')

        exchange_rate_start = request.query_params.get('rate_start')
        exchange_rate_end = request.query_params.get('rate_end')

        cp_bic_substr = request.query_params.get('cp_bic')
        reference_substr = request.query_params.get('reference')

        if status and status != 'any':
            queryset = queryset.filter(status=status)

        if trade_date_start:
            try:
                trade_date_start = parse(trade_date_start)
                queryset = queryset.filter(c_77H__isnull=False, c_77H__gte=trade_date_start)
            except:
                pass

        if trade_date_end:
            try:
                trade_date_end = parse(trade_date_end)
                queryset = queryset.filter(c_77H__isnull=False, c_77H__lte=trade_date_end)
            except:
                pass

        if settlement_date_start:
            try:
                settlement_date_start = parse(settlement_date_start)
                queryset = queryset.filter(c_30T__isnull=False, c_30T__gte=settlement_date_start)
            except:
                pass

        if settlement_date_end:
            try:
                settlement_date_end = parse(settlement_date_end)
                queryset = queryset.filter(c_30T__isnull=False, c_30T__lte=settlement_date_end)
            except:
                pass

        if fixing_date_start:
            try:
                fixing_date_start = parse(fixing_date_start)
                queryset = queryset.filter(c_30V__isnull=False, c_30V__gte=fixing_date_start)
            except:
                pass

        if fixing_date_end:
            try:
                fixing_date_end = parse(fixing_date_end)
                queryset = queryset.filter(c_30V__isnull=False, c_30V__lte=fixing_date_end)
            except:
                pass

        if exchange_rate_start:
            try:
                exchange_rate_start = float(exchange_rate_start)
                queryset = queryset.filter(c_36__isnull=False, c_36__gte=exchange_rate_start)
            except:
                pass
        
        if exchange_rate_end:
            try:
                exchange_rate_end = float(exchange_rate_end)
                queryset = queryset.filter(c_36__isnull=False, c_36_lte=exchange_rate_end)
            except:
                pass
        
        if sell_ccy and sell_ccy != 'Any':
            print(sell_ccy)
            queryset = queryset.filter(c_33B_fi=sell_ccy)

        if sell_amount_start:
            try:
                sell_amount_start = float(sell_amount_start)
                queryset = queryset.filter(c_33B_se__gte=sell_amount_start)
            except:
                pass

        if sell_amount_end:
            try:
                sell_amount_end = float(sell_amount_end)
                queryset = queryset.filter(c_33B_se__lte=sell_amount_end)
            except:
                pass
        
        if buy_ccy and buy_ccy != 'Any':
            queryset = queryset.filter(c_32B_fi=buy_ccy)

        if buy_amount_start:
            try:
                buy_amount_start = float(buy_amount_start)
                queryset = queryset.filter(c_32B_se__gte=buy_amount_start)
            except:
                pass

        if buy_amount_end:
            try:
                buy_amount_end = float(buy_amount_end)
                queryset = queryset.filter(c_32B_se__lte=buy_amount_end)
            except:
                pass

        if cp_bic_substr:
            queryset = queryset.filter(c_87__isnull=False, c_87__icontains=cp_bic_substr)

        if reference_substr:
            queryset.filter(Q(c_20__icontains=reference_substr) | Q(c_21__icontains=reference_substr))

        return queryset


class ListOneToOneMatchView(ListAPIView):
    queryset = OneToOneMatches.objects.all()
    serializer_class = OneToOneMatchSerializer
    pagination_class = LimitOffsetPagination


class RetrieveOneToOneMatchView(RetrieveAPIView):
    lookup_field = 'pk'
    queryset = OneToOneMatches.objects.all()
    serializer_class = OneToOneMatchSerializer

class RetrieveOneToOneBySGMessage(APIView):
    def get(self, request, pk):
        data = OneToOneMatches.objects.filter(sg_message__pk=pk)
        if data:
            serializer = OneToOneMatchSerializer(data.first())
            return Response(serializer.data)
        raise Http404


class ListCloseFitView(ListAPIView):
    queryset = CloseFitMatches.objects.all()
    serializer_class = CloseFitSerializer
    pagination_class = LimitOffsetPagination

class RetrieveCloseFitView(RetrieveAPIView):
    lookup_field = 'pk'
    queryset = CloseFitMatches.objects.all()
    serializer_class = CloseFitSerializer

class RetrieveCloseFitBySGMessage(APIView):
    def get(self, request, pk):
        data = CloseFitMatches.objects.filter(sg_message__pk=pk)
        if data:
            serializer = CloseFitSerializer(data.first())
            return Response(serializer.data)
        raise Http404