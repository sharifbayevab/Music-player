from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from .models import RecommendedTrack, RecentlyPlayed
from .serializers import RecommendedTrackSerializer, RecentlyPlayedSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.utils import timezone

class RecommendedTrackList(ListCreateAPIView):
    queryset = RecommendedTrack.objects.all()
    serializer_class = RecommendedTrackSerializer


class RecentlyPlayedList(ListCreateAPIView):
    serializer_class = RecentlyPlayedSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return RecentlyPlayed.objects.filter(user=user).order_by('-played_at')

    def post(self, request, *args, **kwargs):
        track_id = request.data.get('track')
        user = request.user

        recently_played, created = RecentlyPlayed.objects.update_or_create(
            user=user,
            track_id=track_id,
            defaults={'played_at': timezone.now()}
        )

        if created:
            return Response({'message': 'Track added to recently played.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Recently played time updated.'}, status=status.HTTP_200_OK)

class IsReacentPlayed(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, track_id):
        user = request.user
        is_played = RecentlyPlayed.objects.filter(user=user, track_id=track_id).exists()
        return Response({"IsRecentPlayed": is_played})