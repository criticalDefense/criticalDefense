

from django.contrib import admin
from django.urls import path, include  # add this
from app.views import GetTickets

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("authentication.urls")),  # add this
    path("", include("app.urls")),
    path('', GetTickets.as_view(template_name='/'), name='Ticket View'),  # add this
]
