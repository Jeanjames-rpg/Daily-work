from django.urls import path

from .views import(
    CourseCreateview,
    CourseListView,
    MyCoursesView,
    CousedetailView,
    ChapterCreateview,
    EnrollView,
    MyEnrollmentsVIew,
    EnrollmentStatusView,
)

urlpatterns = [

    path('',CourseListView.as_view()),
    path('create/',CourseCreateview.as_view()),
    path('my-courses/',MyCoursesView.as_view()),
    path('<int:pk>/',CousedetailView.as_view()),
    path('chapters/create',ChapterCreateview.as_view()),
    path("enroll/",EnrollView.as_view()),
    path("my-enrollments/",MyEnrollmentsVIew.as_view()),
    path("<int:course_id>/enrollment=status/",EnrollmentStatusView.as_view()),
]