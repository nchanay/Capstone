from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


# Create your models here.
class Pixelfy(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_image = models.ImageField(upload_to='images/original')
    altered_image = models.ImageField(upload_to='images/altered')
    created_date = models.DateTimeField(default=timezone.now)
    # public = models.BooleanField(default=True)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)

    def __str__(self):
        return self.user.username + str(self.pk)

    def total_likes(self):
        return self.likes.count()
