from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *



urlpatterns = [
    path('user', ProfileRetrive.as_view()),
]   

#/user/api/