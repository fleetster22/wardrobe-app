from django.urls import path

from .views import list_bins, list_shoes, show_shoe

urlpatterns = [
    path("bins/", list_bins, name="list_bins"),
    path("shoes/", list_shoes, name="create_shoes"),
    path("shoes/<int:id>/", show_shoe, name="show_shoe"),
]
