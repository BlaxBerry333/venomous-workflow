import os

env = os.getenv("APP_SERVER_ENV", "production")

if env == "production":
    from .production import *
else:
    from .development import *
