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
    CourseUpdateView,
    CourseDeleteView,
    ChapterDetailView,
    ChapterUpdateView
)

urlpatterns = [

    path('',CourseListView.as_view()),
    path('create/',CourseCreateview.as_view()),
    path('my-courses/',MyCoursesView.as_view()),
    path('<int:pk>/',CoursedetailView.as_view()),
    path('chapters/create/',ChapterCreateview.as_view()),
    path("enroll/",EnrollView.as_view()),
    path("my-enrollments/",MyEnrollmentsVIew.as_view()),
    path("<int:course_id>/enrollment-status/",EnrollmentStatusView.as_view()),
    path("<int:course_id>/students/",CourseStudentsView.as_view()),
    path("update/<int:pk>/",CourseUpdateView.as_view()),
    path("delete/<int:pk>/",CourseDeleteView.as_view()),
    path("chapters/<int:pk>/",ChapterDetailView.as_view()),
    path("chapters/update/<int:pk>/",ChapterUpdateView.as_view())

]