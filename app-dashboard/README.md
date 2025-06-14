# Venomous Workflow Dashboard

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Local Setup](#local-setup)
  - [Create Superuser](#create-superuser)
  - [Change Liberaries](#change-liberaries)

## Overview

This is a dashboard for Venomous Workflow. It is a web application that allows you to view and manage workflow tasks.

## Tech Stack

- react v19
- typescript v5
- vite v6
- react-router-dom v6
- react-query v5
- react-hook-form v7
- react-i18n v15
- reactflow v12
- zod v3

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

[More Details](../app-server/README.md#create-superuser)

### Change Liberaries

```zsh
# 1. update or install package
% yarn upgrade <package>
% yarn add <package>
% cd ..

# 2. stop containers
% make stop-all

# 3. rebuild images
% make build-all

# 4. setup containers
% make setup-all ENV=dev    # dev environment
% make setup-all ENV=prod   # prod environment
% make setup-all            # prod environment
```
