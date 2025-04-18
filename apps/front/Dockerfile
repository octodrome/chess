################################
#### IMAGE DOCUMENTATION 🐳 ####
################################
# - Multi-stage build: https://docs.docker.com/build/building/multi-stage/
# - @TODO try minimizing production image size: https://dev.to/sliplane/minimizing-nuxt-3-docker-images-5d5g
# @TODO Security: By default docker uses root to run container
#                 Images vendors typically set a user to be used,
#                 it is your job to use it in production ex: USER: node 

##########################
### Test dev container ###
# $ docker image build --target dev -t chess_front_dev ./front
# $ docker container run -p 3000:3000 chess_front_dev
##########################

##########################
### Test prod container ##
# $ docker image build --target prod -t colinfaivre/chess_front_prod ./front
# $ docker container run -p 80:3000 chess_front_prod
# Access inside to see what is wrong:
# $ docker container run -it -p 80:3000 chess_front_prod sh
# $ docker image push colinfaivre/chess_front_prod
##########################

FROM node:20.17-alpine AS base
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
RUN apk update && apk upgrade
COPY package-lock.json package.json ./
RUN npm i
COPY . .

FROM base AS dev
RUN apk add curl
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN npm run build
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
