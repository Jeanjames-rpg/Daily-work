from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Courses
from .serializers import CourseSerialzer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from .serializers import ChapterSerializer
from .serializers import EnrollmentSerializer
from .models import Enrollment
from .serializers import EnrollmentListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CourseStudentsSerializer

# Create your views here.

class CourseCreateview(
    generics.CreateAPIView
):
    serializer_class = CourseSerialzer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        
        if self.request.user.role != "mentor":
            raise PermissionDenied(
                "ONly mentor can create"
            )
       
        serializer.save(
            mentor = self.request.user
        )

class CourseListView(
    generics.ListAPIView
):
    queryset = Courses.objects.all()

    serializer_class = CourseSerialzer

    permission_classes = [AllowAny]


class MyCoursesView(generics.ListAPIView):

    serializer_class = CourseSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Courses.objects.filter(
            mentor=self.request.user
        )
    
class CoursedetailView(generics.RetrieveAPIView):

    queryset = Courses.objects.all()

    serializer_class =CourseSerialzer

    permission_classes = [AllowAny]

class ChapterCreateview(generics.CreateAPIView):

    serializer_class = ChapterSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        
        course = serializer.validated_data["course"]

        if course.mentor != self.request.user:

            raise PermissionDenied(
                "YOU DONOT OWN THIS COURSE."
            )
        serializer.save()

class EnrollView(
    generics.CreateAPIView
):
    
    serializer_class = EnrollmentSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def perform_create(self, serializer):
        
        if self.request.user.role != "student":

            raise PermissionDenied(
                "Only students can enroll."
            )
        serializer.save(
            student=self.request.user
        )

class MyEnrollmentsVIew(generics.ListAPIView):

    serializer_class = EnrollmentListSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(
            student= self.request.user
        )
    
class EnrollmentStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):

        enrolled = Enrollment.objects.filter(
            student= request.user,

            course_id=course_id
        ).exists()

        return Response({
            "enrolled":enrolled
        })
    
class CourseStudentsView(generics.ListAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = CourseStudentsSerializer


    def get_queryset(self):
        
        course_id = self.kwargs['course_id']

        course = Courses.objects.get(id=course_id)

        if course.mentor != self.request.user:

            raise PermissionDenied(
                "You dont own this course."
            )
        
        return Enrollment.objects.filter(
            course=course
        )


class CourseUpdateView(generics.UpdateAPIView):

    queryset = Courses.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = CourseSerialzer

    def perform_update(self, serializer):
        
        if serializer.instance.mentor != self.request.user :
            raise PermissionDenied(
                "You dont own this course"
            )
        serializer.save()

class CourseDeleteView(generics.DestroyAPIView):

    queryset = Courses.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = CourseSerialzer

    def perform_destroy(self, instance):
        
        if instance.course.mentor != self.request.user :

            raise PermissionDenied (
                "You dont own this course."
            )
        instance.delete()