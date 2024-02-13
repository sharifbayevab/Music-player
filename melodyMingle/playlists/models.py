from django.db import models

class Track(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)  # Название трека
    artist = models.CharField(max_length=200)  # Исполнитель
    album = models.CharField(max_length=200, blank=True)  # Альбом (необязательное поле)
    genre = models.CharField(max_length=100, blank=True)  # Жанр (необязательное поле)
    rating = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    track_file_url = models.URLField()  # URL файла трека на облачном диске
    cover_image_url = models.URLField(blank=True)  # URL обложки трека (необязательное поле)
    duration = models.DurationField()  # Продолжительность трека

    def __str__(self):
        return f"{self.title} by {self.artist}"
