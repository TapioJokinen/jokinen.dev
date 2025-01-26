#!/usr/bin/env bash

set -e

cd ~/jokinen.dev

docker buildx build . -t jokinen.dev

docker run -d jokinen.dev

CONTAINER_ID=$(docker container ls --all --filter=ancestor=jokinen.dev --format "{{.ID}}" | head -n 1)

if [ -z "$CONTAINER_ID" ]; then
    echo "Error: No container found for jokinen.dev."
    exit 1
fi


docker cp "$CONTAINER_ID":/app/dist/. ./dist

docker stop "$CONTAINER_ID"

docker rm "$CONTAINER_ID"

WEBSERVER_CONTAINER_ID=$(docker ps -f name=reverse_proxy --format "{{.ID}}" | head -n 1)

if [ -z "$WEBSERVER_CONTAINER_ID" ]; then
    echo "Error: Web server container not found."
    exit 1
fi

docker cp ./dist/. "$WEBSERVER_CONTAINER_ID":/www/data/jokinen.dev/.

docker exec "$WEBSERVER_CONTAINER_ID" nginx -s reload
