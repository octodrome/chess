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
# $ docker image build --target dev -t chess_back_dev ./back
# $ docker container run -p 8080:8080 chess_back_dev

##########################
### Test prod container ##
# $ docker image build --target prod -t colinfaivre/chess_back_prod ./back
# $ docker container run -p 8080:8080 chess_back_prod
# $ docker image push colinfaivre/chess_back_prod

FROM golang:1.23-alpine AS base
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

FROM base AS dev
ENV FRONT_URL=http://localhost:3000
RUN go build -o main .
RUN go install github.com/onsi/ginkgo/ginkgo
EXPOSE 8001
CMD ["./main"]

FROM base AS prod
ENV FRONT_URL=https://nuxtchess.com
RUN go build -o main .
EXPOSE 8001
CMD ["./main"]
