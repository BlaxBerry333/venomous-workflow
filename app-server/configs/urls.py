from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),
    path("api/account/", include("accounts.urls")),
    path("api/<str:user_id>/", include("workflows.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
