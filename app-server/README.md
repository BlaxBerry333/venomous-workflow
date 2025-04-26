# Venomous Workflow Server

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Local Setup](#local-setup)
  - [Create Superuser](#create-superuser)
  - [Change Liberaries](#change-liberaries)
- [Commands Inside Container](#commands-inside-container)
- [Links](#links)
- [APIs](#apis)

## Overview

This is a server for Venomous Workflow. It is a web application that allows you to view and manage workflow tasks.

## Tech Stack

- python v3.10.0
- django v4.2
- django-rest-framework v3.14
- django-rest-framework-simplejwt v5.2

## Usage

### Local Setup

```zsh
# 1. clone then go to the directory
% git clone https://github.com/BlaxBerry333/venomous-workflow.git
% cd venomous-workflow

# 2. setup containers
% make setup-all ENV=dev    # dev environment
% make setup-all ENV=prod   # prod environment
% make setup-all            # prod environment

# 3. migrate using custom user model
% make entry CONTAINER=server
root@[CONTAINER_ID]:/app# \
    python manage.py makemigrations accounts && \
    python manage.py migrate accounts && \
    python manage.py migrate
```

### Create Superuser

> - EMAIL: admin@example.com
> - USERNAME: admin
> - PASSWORD: admin

```zsh
% make entry CONTAINER=server
root@[CONTAINER_ID]:/app# \
    export DJANGO_SUPERUSER_EMAIL=admin@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=admin && \
    python manage.py createsuperuser --noinput \
        --name admin
root@[CONTAINER_ID]:/app# exit
```

### Change Liberaries

```zsh
# 1. update requirements.txt
% make stop-all

# 2. build images
% make build-all

# 3. setup containers
% make setup-all ENV=dev    # dev environment
% make setup-all ENV=prod   # prod environment
% make setup-all            # prod environment
```

## Commands Inside Container

```zsh
# Enter Container
% make entry CONTAINER=server

# Django Commands
root@[CONTAINER_ID]:/app# python manage.py [DJANGO_COMMAND] [OPTIONS]
root@[CONTAINER_ID]:/app# python manage.py makemigrations [APP_NAME]
root@[CONTAINER_ID]:/app# python manage.py migrate [APP_NAME]

# Other Commands
root@[CONTAINER_ID]:/app# black .        # format code

# Exit Container
root@[CONTAINER_ID]:/app# exit
```

## Links

Local URL:

- Django Admin: `http://localhost:5200/admin/`
- Django Rest Framework: `http://localhost:5200/api/<ENTRYPOINT>`

## APIs

| Method            | Path                                | Description          |
| ----------------- | ----------------------------------- | -------------------- |
| **account**       | -                                   | -                    |
| POST              | `/api/account/signin/`              | signin               |
| POST              | `/api/account/signup/`              | signup               |
| POST              | `/api/account/signout/`             | signout              |
| POST              | `/api/account/refresh-accesstoken/` | refresh access token |
| **account users** | -                                   | -                    |
| GET               | `/api/account/users/`               | -                    |
| POST              | `/api/account/users/`               | -                    |
| GET               | `/api/account/users/{id}`           | -                    |
| PUT               | `/api/account/users/{id}`           | -                    |
| DELETE            | `/api/account/users/{id}`           | -                    |
