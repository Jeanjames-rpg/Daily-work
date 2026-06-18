from django.urls import path

from .views import(
    CourseCreateview,
    CourseListView,
    MyCoursesView,
    CousedetailView,
    ChapterCreateview
)

urlpatterns = [

    path('',CourseListView.as_view()),
    path('create/',CourseCreateview.as_view()),
    path('my-courses/',MyCoursesView.as_view()),
    path('<int:pk>/',CousedetailView.as_view()),
    path('chapters/create',ChapterCreateview.as_view()),
]