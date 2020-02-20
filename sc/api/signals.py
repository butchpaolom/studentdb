from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Student)
def create_transaction(sender, instance, created, **kwargs):
    if created:
        print(instance)