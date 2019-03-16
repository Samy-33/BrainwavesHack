from applications.user.serializers import (
    CreateUserSerializer, LoginUserSerializer,
    UserSerializer
)
from applications.user.models import User
from django.shortcuts import get_object_or_404
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RegistrationView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        user_data = request.data
        serializer = CreateUserSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        serialized_user = UserSerializer(user)

        context = serializer.data
        context.update({'token': AuthToken.objects.create(user), 'user': serialized_user.data})

        return Response(context, status=status.HTTP_201_CREATED)


class BasicLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        user_data = request.data
        serializer = LoginUserSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        serialized_login_data = serializer.validated_data
        user = User.objects.get(username=serialized_login_data.username)
        serialized_user = UserSerializer(user)
        return Response({
            'user': serialized_user.data,
            'token': AuthToken.objects.create(user),
        })


class TokenCheckView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        user_serialized = UserSerializer(request.user)
        return Response({
            'user': user_serialized.data,
            'isValid': True
        })


class ListUsersView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        users_json = UserSerializer(users, many=True)
        return Response(users_json.data)


class UserDetailView(APIView):
    authentication_classes = (TokenAuthentication,)
    permissions_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = User.objects.filter(username=username)
        if not user.exists():
            return Response({
                'error_message': 'User not found'
            }, status.HTTP_404_NOT_FOUND)

        fields_to_hide = ''
        if request.user != user.first():
            fields_to_hide = 'email'

        user = UserSerializer(user.first(), fields_to_hide=fields_to_hide)
        # user.is_valid()
        return Response(user.data)