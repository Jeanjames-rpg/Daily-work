from rest_framework import serializers
from .models import Courses
from .models import Chapter




class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = '__all__'



class CourseSerialzer(serializers.ModelSerializer):

    mentor_name = serializers.CharField(
        source ='mentor.username',
        read_only = True

    )


    chapters = ChapterSerializer(
        many = True,
        read_only = True
    )


    class Meta:
        model = Courses
        fields = '__all__'
        read_only_fields = ['mentor']




