from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse
from base64 import b64encode
from .models import *


# Create your views here.
def index(request):
    feed = Pixelfy.objects.all().order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


@login_required
def upload(request):
    if request.method == "POST":
        data = request.FILES
        print(request.FILES)
        alt_img_data = request.POST['altered_image']

        post = Pixelfy(user=request.user, original_image=data['original_image'], altered_image=data.get('altered_image'))
        post.save()
        return redirect('profile')
    return render(request, 'pixelfy_app/upload.html')


# def saveImage(request):
#     if request.method == "POST":
#         data = request.post.data
#         print(data)
#         print(request.POST)
#         print(request.body)
#         post = Pixelfy(user=request.user, original_image=data[original_image], altered_image=data[altered_image])
#         post.save()
#     return redirect('profile.html')
