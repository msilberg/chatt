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

# Start Server
run-server:
	npm i && node ./src/server/$(SERVER_FILE_ENV)

# Start Server in a development/debugging mode
run-dev-server:
	npm run dev

# Stop Server
# stop-server:
# 	pkill -f "node server.js" 

# Run MongoDB Docker container
run-mongodb:
	mkdir -p $(APP_PATH_ENV)/$(DATA_DIR_ENV) && docker run -p $(MONGO_IP_ADDR_ENV):27017:27017 --name $(APP_NAME_ENV) -v $(APP_PATH_ENV)/$(DATA_DIR_ENV):/data/db -d mongo

# Start the Chatt App
start: run-mongodb run-server

# Start the Chatt App
start-dev: run-mongodb run-dev-server

# Stop the Chatt App
stop:
	docker stop $(APP_NAME_ENV)
	docker rm $(APP_NAME_ENV)

.PHONY: run-server run-dev-server stop-server run-mongodb start start-dev stop
