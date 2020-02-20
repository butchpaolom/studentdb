from django.shortcuts import render

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework import generics

from .serializers import *
from .models import Student
from users.models import Profile, School, Degree
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict
import django_filters



class BatchViewSet(viewsets.ModelViewSet):
    serializer_class = BatchListSerializer
    queryset = YearSectionDegreeSchool.objects.all()
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        if request.user.id != None:
            id = request.user.id
            user = Profile.objects.get(user__id=id)
            if user.school == None:
                new_queryset = YearSectionDegreeSchool.objects.all()
            else:
                new_queryset = YearSectionDegreeSchool.objects.filter(school=user.school)
        else:
            new_queryset = YearSectionDegreeSchool.objects.all()
        queryset = self.filter_queryset(new_queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.BatchListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BatchRetrieveSerializer(instance)
        return Response(serializer.data)

class SchoolRetrieve(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SchoolSerializer
    queryset = School.objects.all()

    def list(self, request, *args, **kwargs):
        if request.user.id != None:
            id = request.user.id
            user = Profile.objects.get(user__id=id)
            if user.school == None:
                new_queryset = School.objects.all()
            else:
                new_queryset = School.objects.filter(name=user.school.name)
        else:
            new_queryset = School.objects.all()
        queryset = self.filter_queryset(new_queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SchoolYearList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SchoolYearSerializer
    queryset = SchoolYear.objects.all().order_by('start')

class Validate(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        return Response({'detail':'Authenticated'}, status=status.HTTP_200_OK)

class StudentRetrieve(generics.RetrieveAPIView):
    serializer_class = StudentRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Student.objects.all()
    lookup_field = 'student_id'


