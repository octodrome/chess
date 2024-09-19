FROM node:12-alpine
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --chown=node:node package-lock.json package.json ./
RUN npm install --frozen-lockfile
COPY --chown=node:node . .
CMD ["npm", "dev"]
