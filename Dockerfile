FROM node:23-alpine3.21

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["tail", "-f", "/dev/null"]
