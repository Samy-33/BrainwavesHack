from django.urls import path
from applications.user.views import (
    RegistrationView, ListUsersView,
    BasicLoginView, TokenCheckView,
    UserDetailView
)

app_name = 'user'

urlpatterns = [
    path('', ListUsersView.as_view()),
    path('login/', BasicLoginView.as_view()),
    path('signup/', RegistrationView.as_view(), name='create_user'),
    path('check-token/', TokenCheckView.as_view(), name='check_token'),
    path('detail/<str:username>/', UserDetailView.as_view(), name='get_user')
]