from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from .models import Favourite
from .serializers import FavouritesSerializer
from rest_framework.permissions import IsAuthenticated


class FavouriteList(ListCreateAPIView):
    serializer_class = FavouritesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Favourite.objects.filter(user=user)


class FavouriteToggle(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        track_id = request.data.get('track')
        user = request.user

        favourite, created = Favourite.objects.get_or_create(user=user,
                                                             track_id=track_id)

        if not created:
            favourite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_201_CREATED)


class IsFavourite(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, track_id):
        user = request.user
        is_favourite = Favourite.objects.filter(user=user, track_id=track_id).exists()
        return Response({"isFavourite": is_favourite})


class FavouriteDetail(RetrieveUpdateDestroyAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouritesSerializer
