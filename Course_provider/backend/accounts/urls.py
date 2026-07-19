from django.urls import path

from .views import RegisterView
from .views import MeView
from .views import UserUpdateView

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('me/',MeView.as_view()),
    path("profile/update/",UserUpdateView.as_view())
]