from django.shortcuts import render
from rest_framework import generics
from .models import Track
from .serializers import TrackSerializer
from rest_framework.permissions import IsAuthenticated


class TrackListCreateView(generics.ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class TrackDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
