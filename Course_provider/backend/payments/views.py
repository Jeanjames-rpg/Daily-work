from django.shortcuts import render
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from courses.models import Courses
from .models import Payment

# Create your views here.
client = razorpay.Client(
    auth = (
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


class CreateOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        course_id = request.data.get("course_id")

        if not course_id:

            return Response(
                {"error": "Course ID is required"},
                status=400
            )

        try:
            course = Courses.objects.get(id=course_id)
        except Courses.DoesNotExist:
            return Response(
                {"error": "Course not found"},
                status=404
            )

        amount = int(course.price * 100) 

        order = client.order.create({
            "amount":amount,
            "currency":"INR",
            "payment_capture": 1,
        })

        Payment.objects.create(
            student = request.user,
            course=course,
            amount=course.price,
            razorpay_order_id = order["id"],
            status="Pending",
        )

        return Response({
            "order_id": order["id"],
            "amount": amount,
            "currency": "INR",
            "key": settings.RAZORPAY_KEY_ID,
            "course": course.title,
        })