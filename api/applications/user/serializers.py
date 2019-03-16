from django.contrib.auth import authenticate
from rest_framework import serializers
from utils.serializer_utils import DynamicFieldModelSerializer
from applications.user.models import User

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        user = User(
            username=validated_data.get('username'),
            password=validated_data.get('password'),
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        
        user.save()
        return user

    # def validate_username(self, username):
    #     user_exists = User.objects.filter(username=username).exists()

    #     if user_exists:
    #         raise serializers.ValidationError("Username already exists.")
        
    #     return username

    def validate_email(self, email):

        if not email:
            raise serializers.ValidationError("This field may not be blank.")

        email_exists = User.objects.filter(email=email).exists()

        if email_exists:
            raise serializers.ValidationError("This email address already in use.")

        return email

    def validate_password(self, password):
        if password and len(password) >= 8:
            return password

        raise serializers.ValidationError("Password must be at least 8 characters long.")

    def validate_first_name(self, first_name):
        if not first_name:
            raise serializers.ValidationError("This field may not be blank.")

        return first_name

    def validate_last_name(self, last_name):
        if not last_name:
            raise serializers.ValidationError("This field may not be blank.")

        return last_name

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid Credentials Provided')


class UserSerializer(DynamicFieldModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'full_name', 'is_active', 'color',
            'date_joined', 'rating', 'contribution_rating', 'dp_url', 'institute', 'country')
        # exclude = ('password', 'id', 'is_superuser',
        #     'last_login', 'is_staff', 'user_permissions')
