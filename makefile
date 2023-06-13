# App environment variables
APP_PATH := $(shell pwd)
APP_NAME := chatt
APP_PORT := 3000
DATA_DIR := data
SERVER_FILE := server.js
MONGO_IP_ADDR := 127.0.0.1

# Start Server
run-server:
	npm i && NODE_ENV=test APP_NAME=$(APP_NAME) APP_PORT=$(APP_PORT) APP_PATH=$(APP_PATH) MONGO_IP_ADDR=$(MONGO_IP_ADDR) node ./src/server/$(SERVER_FILE)

# Start Server in a development/debugging mode
run-dev-server:
	npm i && \
	npm run build && \
	NODE_ENV=development APP_NAME=$(APP_NAME) APP_PORT=$(APP_PORT) APP_PATH=$(APP_PATH) MONGO_IP_ADDR=$(MONGO_IP_ADDR) node $(APP_PATH)/dist/$(SERVER_FILE)

# Stop Server
# stop-server:
# 	pkill -f "node server.js" 

# Run MongoDB Docker container
run-mongodb:
	mkdir -p $(APP_PATH)/$(DATA_DIR) && docker run -p $(MONGO_IP_ADDR):27017:27017 --name $(APP_NAME) -v $(APP_PATH)/$(DATA_DIR):/data/db -d mongo

# Start the Chatt App
start: run-mongodb run-server

# Start the Chatt App
start-dev: run-mongodb run-dev-server

# Stop the Chatt App
stop:
	docker stop $(APP_NAME)
	docker rm $(APP_NAME)

.PHONY: run-server run-dev-server stop-server run-mongodb start start-dev stop
