# Venomous Workflow

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Local Setup](#local-setup)
  - [Create Superuser](#create-superuser)

## Overview

This is a project that aims to provide a workflow management system.

## Tech Stack

|                               | Port   | Main Skills                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Dashboard](./app-dashboard/) | `5000` | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--react.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--vite.png?raw=true" style="width:40px;" />                 |
| [Server](./app-server/)       | `5200` | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-backend--django.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-backend--django-rest-framework.png?raw=true" style="width:40px;" /> |
| DataBase                      | `5300` | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/database--postgresql.png?raw=true" style="width:40px;" />                                                                                                                                                                             |
| Cache                         | `5400` | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:40px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/database--redis.png?raw=true" style="width:40px;" />                                                                                                                                                                                  |

## Usage

### Local Setup

```zsh
% git clone https://github.com/BlaxBerry333/venomous-workflow.git
% cd venomous-workflow

% make setup-all ENV=dev    # dev environment
% make setup-all ENV=prod   # prod environment
% make setup-all            # prod environment
```

### Create Superuser

[More Details](./app-server/README.md#create-superuser)

<!-- ### Troubleshooting

> - API connection too f\*\*\*ing slow in production env ?
> - API connection failure in production env ?

**[Render Free Web Service Plan](https://docs.render.com/free#free-web-services)**

**[Spinning down on idle](https://docs.render.com/free#spinning-down-on-idle)**
Render spins down a Free web service that goes **15 minutes** without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.
Spinning up a service takes a few seconds, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily.

**[Monthly usage limits](https://docs.render.com/free#monthly-usage-limits)**
Render grants **750** Free instance **hours** to each user and team per calendar month. A Free web service consumes these hours as long as it’s running (spun-down services don’t consume Free instance hours). Any remaining Free instance hours expire at the end of each month. -->
