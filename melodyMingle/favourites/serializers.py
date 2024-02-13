from rest_framework import serializers
from .models import Favourite, Track
from playlists.serializers import TrackSerializer

class FavouritesSerializer(serializers.ModelSerializer):
    track_detail = TrackSerializer(source='track', read_only=True)

    class Meta:
        model = Favourite
        fields = ['user', 'track', 'liked_at', 'track_detail']
