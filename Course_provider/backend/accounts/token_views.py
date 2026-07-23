from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView

# class MyTokenObtainPairView(TokenObtainPairView):

#     serializer_class = MyTokenObtainPairSerializer


class CookieTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):

        response = super().post(request, *args, **kwargs)

        access = response.data["access"]
        refresh = response.data["refresh"]

        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=False,
            samesite=None,
            max_age=60 * 60
        )

        response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=False,
            samesite=None,
            max_age=7 * 24 * 60 * 60
        )

        response.data = {
            "message": "Login successful"
        }

        return response
    

class CookieTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        
        request.data["refresh"] = request.COOKIES.get("refresh")

        response = super().post(request, *args, **kwargs)

        access = response.data["access"]

        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=False,
            samesite=None
        )

        response.data = {
            "message": "Token refreshed"
        }

        return response