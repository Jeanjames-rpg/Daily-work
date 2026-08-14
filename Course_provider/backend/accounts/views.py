from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from .serializers import UserUpdateSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({
            "message": "Registeration successful"
        })

        response.set_cookie(
            key="access",
            value=str(access),
            httponly=True,
            secure=False,
            samesite=None,
            max_age=60*60
        )

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite=None,
            max_age=7 * 24 * 60 * 60
        )

        return response

class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)
    
class UserUpdateView(generics.RetrieveUpdateAPIView):
    
    serializer_class = UserUpdateSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class LogoutView(APIView):

    def post(self, request):

        response = Response({
            "message": "Logged out"
        })

        response.delete_cookie("access")
        response.delete_cookie("refresh")


        return response


User = get_user_model()
class PasswordResetRequestView(APIView):

    def post(self, request):

        email = request.data.get("email")

        if not email:
            return Response(
                {"message": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return Response({
                "message": "If the email exists, a reset link has been sent."
            })

        token = default_token_generator.make_token(user)

        reset_link = (
            f"{settings.FRONTEND_URL}/reset-password/"
            f"{user.id}/{token}/"
        )

        print("RESET LINK:",reset_link)

        send_mail(
            "Reset your Hive password",
            f"Click this link to reset your password:\n\n{reset_link}",
            None,
            {user.email},
        )

        return Response({
            "message": "If the email exists, a reset link has been sent."
        })


class PasswordResetConfirmView(APIView):

    def post(self, request):

        user_id = request.data.get("user_id")
        token = request.data.get("token")
        password = request.data.get("password")

        print("USER ID:",user_id)
        print("TOKEN:", token)
        print("PASSWORD RECIVED:",bool(password))

        if not user_id or not token or not password:
            print("Missing Field")
            return Response(
                {"message": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)

        except User.DoesNotExist:
            print("USER DOES NOT EXIST")
            return Response(
                {"message": "Invalid reset link"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"message": "Invalid or expired reset link"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(password)
        user.save()

        return Response(
            {"message": "Password reset successful"}
        )