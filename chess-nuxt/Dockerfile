FROM node:12-alpine
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --chown=node:node yarn.lock package.json ./
RUN yarn --frozen-lockfile
COPY --chown=node:node . .
CMD ["yarn", "dev"]
