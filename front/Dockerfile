# @TODO same dockerfile for development and production: --target=dev / --target=prod
# https://dev.to/massivebrains/use-same-dockerfile-for-dev-production-1l7f

#### IMAGE_DOCUMENTATION 🐳
# $ docker build --tag <image_tag> .
# $ docker container run <image_tag>

FROM node:20-alpine AS dev
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
RUN apk update && apk upgrade

COPY package-lock.json package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
