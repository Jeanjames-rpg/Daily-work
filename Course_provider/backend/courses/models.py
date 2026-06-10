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