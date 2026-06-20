from rest_framework import serializers
from .models import Courses
from .models import Chapter
from .models import Enrollment



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


class EnrollmentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Enrollment

        fields = ["course"]


class EnrollmentListSerializer(serializers.ModelSerializer):

    course_title = serializers.CharField(
        source="course.title",
        read_only = True
    )

    class Meta:

        model = Enrollment

        fields = [
            "id",
            "course",
            "course_title",
            "enrolled_at"
        ]