from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register('batch', BatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('check_auth', Validate.as_view()),
    path('school', SchoolRetrieve.as_view()),
    path('sy', SchoolYearList.as_view()),
    path('student/<student_id>', StudentRetrieve.as_view())
]   

#/user/api/