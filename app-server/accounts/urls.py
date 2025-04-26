from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AccountSigninView,
    AccountSignupView,
    AccountSignoutView,
    AccountRefreshAccessTokenView,
    AccountUserViewSet,
)

account_router = DefaultRouter()
account_router.register(r"users", AccountUserViewSet, basename="account_user")

urlpatterns = [
    # POST /api/account/signin/
    path(
        "signin/",
        AccountSigninView.as_view(),
        name="account_signin",
    ),
    # POST /api/account/signup/
    path(
        "signup/",
        AccountSignupView.as_view(),
        name="account_signup",
    ),
    # POST /api/account/signout/
    path(
        "signout/",
        AccountSignoutView.as_view(),
        name="account_signout",
    ),
    # POST /api/account/refresh-accesstoken/
    path(
        "refresh-accesstoken/",
        AccountRefreshAccessTokenView.as_view(),
        name="account_refresh_accesstoken",
    ),
    # GET /api/account/users/
    # POST /api/account/users/
    # GET /api/account/users/{id}/
    # PUT /api/account/users/{id}/
    # DELETE /api/account/users/{id}/
    path("", include(account_router.urls)),
]
