from django.shortcuts import render
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from courses.models import Courses
from .models import Payment

import hmac
import hashlib
from courses.models import Enrollment

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


class VerifyPaymentView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        payment_id = request.data.get("razorpay_payment_id")
        order_id = request.data.get("razorpay_order_id")
        signature = request.data.get("razorpay_signature")

        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            f"{order_id}|{payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature != signature:

            return Response(
                {
                    "success": False,
                    "message": "Invalid Signature"
                },
                status=400
            )

        payment = Payment.objects.get(
            razorpay_order_id = order_id
        )

        payment.razorpay_payment_id = payment_id
        payment.razorpay_signature = signature
        payment.status = "Paid"
        payment.save()

        Enrollment.objects.get_or_create(
            student = request.user,
            course=payment.course
        )

        return Response({
            "success": True,
            "message": "Payment Verfied"
        })