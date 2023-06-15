# App variables
APP_PATH_ENV := $(shell pwd)
APP_NAME_ENV := chatt
APP_PORT_ENV := 3000
DATA_DIR_ENV := data
SERVER_FILE_ENV := index.js
MONGO_IP_ADDR_ENV := 127.0.0.1

# Export App variables to the environment
export APP_PATH=$(APP_PATH_ENV)
export APP_NAME=$(APP_NAME_ENV)
export APP_PORT=$(APP_PORT_ENV)
export DATA_DIR=$(DATA_DIR_ENV)
export SERVER_FILE=$(SERVER_FILE_ENV)
export MONGO_IP_ADDR=$(MONGO_IP_ADDR_ENV) 

# Run MongoDB Docker container
run-mongodb:
	mkdir -p $(APP_PATH_ENV)/$(DATA_DIR_ENV) && docker run -p 127.0.0.1:27017:27017 --name $(APP_NAME_ENV) -v $(APP_PATH_ENV)/$(DATA_DIR_ENV):/data/db -d mongo

# Start Server
run-server:
	npm i && npm run build && npm run dev

# Start the Chatt App
start: run-mongodb run-server

.PHONY: run-mongodb run-server start
