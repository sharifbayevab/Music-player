import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'melodyMingle.settings')
django.setup()

from datetime import timedelta
from playlists.models import Track

for i in range(3):
    Track.objects.create(
        title=f"Song {i}",
        artist=f"Artist {i}",
        genre=f"Genre {i}",
        track_file_url=f"http://example.com/track{i}.mp3",
        cover_image_url=f"http://example.com/cover{i}.jpg",
        duration=timedelta(minutes=3, seconds=30)
    )

# try:
#     track = Track.objects.get(id=1)
#     track.delete()
#     print("Трек удален успешно.")
# except Track.DoesNotExist:
#     print("Трек не найден.")

# Track.objects.all().delete()
# print("Все треки удалены.")
