from django.urls import path

from .views import(
    CourseCreateview,
    CourseListView,
    MyCoursesView,
    CoursedetailView,
    ChapterCreateview,
    EnrollView,
    MyEnrollmentsVIew,
    EnrollmentStatusView,
    CourseStudentsView,
)

urlpatterns = [

    path('',CourseListView.as_view()),
    path('create/',CourseCreateview.as_view()),
    path('my-courses/',MyCoursesView.as_view()),
    path('<int:pk>/',CoursedetailView.as_view()),
    path('chapters/create',ChapterCreateview.as_view()),
    path("enroll/",EnrollView.as_view()),
    path("my-enrollments/",MyEnrollmentsVIew.as_view()),
    path("<int:course_id>/enrollment-status/",EnrollmentStatusView.as_view()),
    path("<int:course_id>/students/",CourseStudentsView.as_view()),
]