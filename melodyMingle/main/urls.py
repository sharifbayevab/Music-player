from django.urls import path
from .views import RecommendedTrackList, RecentlyPlayedList, IsReacentPlayed

urlpatterns = [
    path('recommended-tracks/', RecommendedTrackList.as_view(), name='recommended-tracks'),
    path('recently-played/', RecentlyPlayedList.as_view(), name='recently-played'),
    path('check/<int:track_id>/', IsReacentPlayed.as_view(), name='is-recently-played'),
]
