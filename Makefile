PROJECT_NAME = venomous_workflow
DOCKER_COMPOSE_FILE_PATH_DEV = ./docker/docker-compose.dev.yml
DOCKER_COMPOSE_FILE_PATH_PROD = ./docker/docker-compose.prod.yml

ifeq ($(ENV),dev)
	DOCKER_COMPOSE_FILE_PATH = $(DOCKER_COMPOSE_FILE_PATH_DEV)
else
	DOCKER_COMPOSE_FILE_PATH = $(DOCKER_COMPOSE_FILE_PATH_PROD)
endif


.PHONY: build-all setup-all stop-all clean-all entry


# build images of all containers 
build-all:
	@echo "Venomous Workflow Build All"
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		build \


# setup all containers
# example:
# make setup-all
# make setup-all ENV=dev
# make setup-all ENV=prod
setup-all:
	@echo "Venomous Workflow Setup All"
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH} \
		-p ${PROJECT_NAME} \
		up -d


# stop then remove all containers, but keep volumes、images
# example:
# make stop-all
# make stop-all ENV=dev
# make stop-all ENV=prod
stop-all:
	@echo "Venomous Workflow Stop All"
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		down


# stop then remove all containers、volumes、images
clean-all:
	@echo "Venomous Workflow Clean All"
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH} \
		-p ${PROJECT_NAME} \
		down -v --rmi all --remove-orphans


# entry a running specific container
# example: 
# make entry CONTAINER=server
entry:
	@echo "Venomous Workflow Entry ${CONTAINER}"
	@docker exec -it ${CONTAINER} bash
