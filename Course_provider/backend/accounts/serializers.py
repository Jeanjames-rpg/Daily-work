from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only = True
    )

    class Meta:
        model = User

        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            'id',
            'username',
            'email',
            'role'
        ]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        
        token = super().get_token(user)

        token["username"] = user.username
        token['role'] = user.role

        return token