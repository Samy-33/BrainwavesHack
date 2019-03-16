from django.urls import path
from applications.mt300.views import ListOneToOneMatchView, ListCloseFitView, ListMessageSGView

app_name = 'mt300'

urlpatterns = [
    path('message-sg/list/', ListMessageSGView.as_view(), name='message_sg_list'),
    path('one2one/list/', ListOneToOneMatchView.as_view(), name='one2one_list'),
    path('closefit/list/', ListCloseFitView.as_view(), name='closefit_list')
]