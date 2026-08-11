from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from .serializers import UserUpdateSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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

