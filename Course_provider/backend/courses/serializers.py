from rest_framework import serializers
from .models import Courses


class CourseSerialzer(serializers.ModelSerializer):

    mentor_name = serializers.CharField(
        source ='mentor.username',
        read_only = True

    )

    class Meta:
        model = Courses
        fields = '__all__'
        read_only_fields = ['mentor']