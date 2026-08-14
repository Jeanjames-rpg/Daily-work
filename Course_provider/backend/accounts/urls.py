from django.urls import path

from .views import RegisterView
from .views import MeView
from .views import UserUpdateView
from .views import LogoutView
from .views import (
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('me/',MeView.as_view()),
    path("profile/update/",UserUpdateView.as_view()),
    path("logout/",LogoutView.as_view()),
    path("password-reset/",PasswordResetRequestView.as_view()),
    path("password-reset-confirm/",PasswordResetConfirmView.as_view()),
]