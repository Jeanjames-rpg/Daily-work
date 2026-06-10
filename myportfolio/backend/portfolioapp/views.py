from django.shortcuts import render
from .models import Project
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProjectSerializer

# Create your views here.

@api_view(['GET'])
def projects(request):
    data = Project.objects.all()
    serializer = ProjectSerializer(data,many=True)
    return Response(serializer.data)