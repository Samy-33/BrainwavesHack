from django.urls import path
from applications.mt300.views import (ListOneToOneMatchView, ListCloseFitView,
    ListMessageSGView, RetrieveOneToOneMatchView, RetrieveCloseFitView, RetrieveOneToOneBySGMessage, RetrieveCloseFitBySGMessage)

app_name = 'mt300'

urlpatterns = [
    path('message-sg/list/', ListMessageSGView.as_view(), name='message_sg_list'),
    path('one2one/list/', ListOneToOneMatchView.as_view(), name='one2one_list'),
    path('one2one/<int:pk>/retrieve/', RetrieveOneToOneMatchView.as_view(), name='one2one_retrieve'),
    path('one2one/by/<int:pk>/retrieve/', RetrieveOneToOneBySGMessage.as_view(), name='one2one_by_sg'),
    path('closefit/list/', ListCloseFitView.as_view(), name='closefit_list'),
    path('closefit/<int:pk>/retrieve/', RetrieveCloseFitView.as_view(), name='closefit-retrieve'),
    path('closefit/by/<int:pk>/retrieve/', RetrieveCloseFitBySGMessage.as_view(), name='closefit-retrieve')
]