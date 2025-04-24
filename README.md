# Venomous Workflow

## Setup

```shell
% git clone https://github.com/BlaxBerry333/venomous-workflow.git
% cd venomous-workflow

% npm install
% make setup-all
% make start-all
```

## Create Superuser

> - USERNAME: admin
> - EMAIL: admin@example.com
> - PASSWORD: admin

```shell
% make entry CONTAINER=admin_server
root@[CONTAINER_ID]:/app# \
    export DJANGO_SUPERUSER_USERNAME=admin && \
    export DJANGO_SUPERUSER_EMAIL=admin@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=admin && \
    python manage.py createsuperuser --noinput
root@[CONTAINER_ID]:/app# exit
```
