from django.urls import path

from .views import RegisterView
from .views import MeView

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('me/',MeView.as_view())
]