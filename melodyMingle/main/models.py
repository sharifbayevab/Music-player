from django.db import models
from django.conf import settings
from playlists.models import Track  # Импорт модели Track


class RecommendedTrack(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    recommended_at = models.DateTimeField(auto_now_add=True)  # Время создания рекомендации

    class Meta:
        ordering = ['-recommended_at']

    def __str__(self):
        return f"{self.track.title} recommended to {self.user.username} at {self.recommended_at}"


class RecentlyPlayed(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    played_at = models.DateTimeField(auto_now_add=True)  # Время прослушивания

    class Meta:
        # Определяем, что хотим хранить только последние N записей для каждого пользователя
        # или установить уникальность для пары "user-track" с учетом даты
        ordering = ['-played_at']

    def __str__(self):
        return f"{self.user.username} played {self.track.title} at {self.played_at}"
