################################
#### IMAGE DOCUMENTATION 🐳 ####
################################
# - dev and prod inspiration: https://www.horsfallnathan.com/blog/golang-docker-setup-for-development-and-production-with-multistage-builds
# - Google distroless in prod https://github.com/GoogleContainerTools/distroless
# @TODO Security: By default docker uses root to run container
#                 Images vendors typically set a user to be used,
#                 it is your job to use it in production ex: USER: node 

##########################
### Test dev container ###
# $ docker image build --target dev -t chess_rest_server_dev ./rest-server
# $ docker container run -p 8080:8080 chess_rest_server_dev

##########################
### Test prod container ##
# $ docker image build --target prod -t colinfaivre/chess_rest_server_prod ./rest-server
# $ docker container run -p 8080:8080 chess_rest_server_prod
# $ docker image push colinfaivre/chess_rest_server_prod

FROM golang:1.23-alpine AS base
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

FROM base AS dev
RUN go build -o main .
RUN go install github.com/onsi/ginkgo/ginkgo
EXPOSE 8001
CMD ["./main"]

FROM base AS prod
RUN go build -o main .
EXPOSE 8001
CMD ["./main"]
