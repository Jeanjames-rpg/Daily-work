from django.db import models
from django.conf import settings

# Create your models here.


class Courses(models.Model):

    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='courses'
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title
    

class Chapter(models.Model):

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE,
        related_name="chapters"
    )

    title = models.CharField(max_length=200)

    video = models.FileField(upload_to="videos/")

    order = models.PositiveIntegerField()

    def __str__(self):
        return self.title