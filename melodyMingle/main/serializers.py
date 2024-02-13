from rest_framework import serializers
from .models import RecommendedTrack, RecentlyPlayed, Track
from playlists.serializers import TrackSerializer


class RecommendedTrackSerializer(serializers.ModelSerializer):
    track_detail = TrackSerializer(source='track', read_only=True)
    class Meta:
        model = RecommendedTrack
        fields = ['user', 'track', 'recommended_at', 'track_detail']


class RecentlyPlayedSerializer(serializers.ModelSerializer):
    track_detail = TrackSerializer(source='track', read_only=True)

    class Meta:
        model = RecentlyPlayed
        fields = ['user', 'track', 'played_at', 'track_detail']
