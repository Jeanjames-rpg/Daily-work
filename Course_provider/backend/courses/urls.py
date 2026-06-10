from django.urls import path

from .views import(
    CourseCreateview,
    CourseListView,
    MyCoursesView
)

urlpatterns = [

    path('',CourseListView.as_view()),
    path('create/',CourseCreateview.as_view()),
    path('my-courses/',MyCoursesView.as_view())
]