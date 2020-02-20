from django.db import models
from django.contrib.auth.models import User
from PIL import Image
import uuid
# Create your models here.

class Degree(models.Model):
    title = models.CharField(max_length=100, blank=False)   
    short = models.CharField(max_length=7, blank=True)
    
    def __str__(self):
        return f"{self.short}"

class School(models.Model):
    name = models.CharField(max_length=80, blank=False, unique=True)
    name_short = models.CharField(max_length=10, blank=True, unique=True)
    degrees = models.ManyToManyField(Degree)

    def __str__(self):
        return f"{self.name_short}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE, default=None, blank=True, null=True)
    admin = models.BooleanField(default=False)
    icon = models.ImageField(default='default.jpg')
    # email = models.EmailField(blank=False)

    def __str__(self):
        return str(self.user)
