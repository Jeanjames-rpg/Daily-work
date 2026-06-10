from rest_framework import serializers
from .models import Contact_details

class ContactSerializer(serializers.ModelSerializer):


    class Meta:
        model = Contact_details

        fields = "__all__"