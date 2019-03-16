from rest_framework import serializers
from applications.mt300.models import MessageSG, MessageCP, OneToOneMatches, CloseFitMatches


class MessageSGSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageSG
        fields = '__all__'


class MessageCPSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageCP
        fields = '__all__'



class OneToOneMatchSerializer(serializers.ModelSerializer):
    sg_message = MessageSGSerializer()
    cp_message = MessageCPSerializer()

    class Meta:
        model = OneToOneMatches
        fields = '__all__'


class CloseFitSerializer(serializers.ModelSerializer):
    sg_message = MessageSGSerializer()
    cp_message = MessageCPSerializer()

    class Meta:
        model = CloseFitMatches
        fields = '__all__'


class PaginationSerializer(serializers.Serializer):
    size = serializers.IntegerField()
    offset = serializers.IntegerField()