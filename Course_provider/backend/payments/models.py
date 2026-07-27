from django.db import models
from django.conf import settings
from courses.models import Courses

# Create your models here.

class Payment(models.Model):

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    razorpay_order_id = models.CharField(max_length=200)

    razorpay_payment_id = models.CharField(max_length=200, blank=True)

    razorpay_signature = models.CharField(max_length=300, blank=True)

    status = models.CharField(
        max_length=20,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.course.title}"
