from rest_framework import serializers
from utils.string_utils import StringConstants


class DynamicFieldModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        
        fields_to_hide = kwargs.get('context', {}).get('fields_to_hide', '')

        super(DynamicFieldModelSerializer, self).__init__(*args, **kwargs)

        if fields_to_hide:
            fields_to_hide = fields_to_hide.split(StringConstants.COMMA_DELIMITER)

            for field_name in fields_to_hide:
                self.fields.pop(field_name)