from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse
from django.core.files.base import ContentFile
from base64 import b64decode
from .models import *


# Create your views here.
def index(request):
    feed = Pixelfy.objects.all().order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


@login_required
def upload(request):
    if request.method == "POST":
        original = request.FILES['original_image']
        ext, altered_b64 = request.POST['altered_image'].split(';base64,')
        ext = ext.split('/')[-1]
        altered = ContentFile(b64decode(altered_b64), name='temp.' + ext) # You can save this as file instance.

        print(original, type(original))
        print(altered, type(altered))
        post = Pixelfy(user=request.user, original_image=original, altered_image=altered)
        post.save()
        return redirect('profile')
    return render(request, 'pixelfy_app/upload.html')


def alt_filename(request):
    pass
