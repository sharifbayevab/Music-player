from django.db import models
from django.conf import settings
from playlists.models import Track

class Favourite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)