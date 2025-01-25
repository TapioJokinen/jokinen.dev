#!/usr/bin/env bash

set -e

docker build -t jokinen.dev

docker run -d jokinen.dev

CONTAINER_ID=$(docker container ls --all --filter=ancestor=jokinen.dev --format "{{.ID}}" | head -n 1)

docker cp "$CONTAINER_ID":/app/dist/. ./dist

docker stop "$CONTAINER_ID"

docker rm "$CONTAINER_ID"

WEBSERVER_CONTAINER_ID=$(docker ps -f name=YOUR_SERVICE_NAME --format "{{.ID}}" | head -n 1)

docker cp ./dist/. "$WEBSERVER_CONTAINER_ID":/var/www/html

docker exec "$WEBSERVER_CONTAINER_ID" nginx -s reload
