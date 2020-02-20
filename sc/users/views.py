from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import views
from .models import *
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


# Create your views here.

class ProfileRetrive(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        id = request.user.id
        profile = Profile.objects.get(user__id=id)
        response = {
            'first_name': str(profile.user.first_name),
            'school': str(profile.school),
            'icon': str(profile.icon.url),
            'admin': str(profile.admin)
            }
        return Response(response, status=status.HTTP_200_OK)