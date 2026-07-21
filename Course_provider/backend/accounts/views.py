from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from .serializers import UserUpdateSerializer


# Create your views here.

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

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

