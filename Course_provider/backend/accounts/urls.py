from django.urls import path

from .views import RegisterView
from .views import MeView
from .views import UserUpdateView
from .views import LogoutView

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('me/',MeView.as_view()),
    path("profile/update/",UserUpdateView.as_view()),
    path("logout/",LogoutView.as_view())
]