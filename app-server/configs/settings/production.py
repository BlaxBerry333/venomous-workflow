import os

from .base import *


# General
# ====================================================================================================
# ====================================================================================================
DEBUG = False


# Security
# ====================================================================================================
# ====================================================================================================
ALLOWED_HOSTS = []
CSRF_TRUSTED_ORIGINS = []
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = []


# Database
# ====================================================================================================
# ====================================================================================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ.get("APP_SERVER_DB_HOST", "0.0.0.0"),
        "PORT": os.environ.get("APP_SERVER_DB_PORT", "5300"),
        "USER": os.environ.get("APP_SERVER_DB_USER", "postgres"),
        "PASSWORD": os.environ.get("APP_SERVER_DB_PASSWORD", "postgres"),
        "NAME": os.environ.get("APP_SERVER_DB_NAME", "workflow_server_db"),
    }
}


# CACHES
# ====================================================================================================
# ====================================================================================================
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{os.environ.get('APP_SERVER_REDIS_HOST', '127.0.0.1')}:{os.environ.get('APP_SERVER_REDIS_PORT', '5400')}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 100},
            "IGNORE_EXCEPTIONS": True,
        },
    }
}
