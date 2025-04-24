# Venomous Workflow Server

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Local Setup](#local-setup)
  - [Create Superuser](#create-superuser)
  - [Change Liberaries](#change-liberaries)

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
```

### Create Superuser

> - USERNAME: admin
> - EMAIL: admin@example.com
> - PASSWORD: admin

```zsh
% make entry CONTAINER=server
root@[CONTAINER_ID]:/app# \
    export DJANGO_SUPERUSER_USERNAME=admin && \
    export DJANGO_SUPERUSER_EMAIL=admin@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=admin && \
    python manage.py createsuperuser --noinput
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

## Common Django Commands

```zsh
% make entry CONTAINER=server
root@[CONTAINER_ID]:/app# python manage.py [COMMAND]
root@[CONTAINER_ID]:/app# exit
```
