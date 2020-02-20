from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'home.html')

def batch(request):
    return render(request, 'batch.html')

def landing(request):
    return render(request, 'landing.html')
