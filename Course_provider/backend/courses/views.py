from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Courses
from .serializers import CourseSerialzer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from .serializers import ChapterSerializer

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
    
class CousedetailView(generics.RetrieveAPIView):

    queryset = Courses.objects.all()

    serializer_class =CourseSerialzer

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