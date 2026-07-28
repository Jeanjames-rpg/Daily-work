from django.urls import path
from .views import CreateOrderView
from .views import VerifyPaymentView

urlpatterns = [
    path(
        "create-order/",
        CreateOrderView.as_view(),
        name="create-order"
    ),
    path("verify/",VerifyPaymentView.as_view()),
]