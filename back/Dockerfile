# @TODO same dockerfile for development and production: --target=dev / --target=prod
# https://dev.to/massivebrains/use-same-dockerfile-for-dev-production-1l7f
# @TODO dev and prod inspiration: https://www.horsfallnathan.com/blog/golang-docker-setup-for-development-and-production-with-multistage-builds
# @TODO could use google distroless in prod https://github.com/GoogleContainerTools/distroless

#### IMAGE_DOCUMENTATION 🐳
# https://hub.docker.com/_/golang
# https://docs.docker.com/guides/language/golang/build-images/
# $ docker build --tag <image_tag> .
# $ docker container run <image_tag>

FROM golang:1.23-alpine AS dev

WORKDIR /app
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN go build -o main .
EXPOSE 8080

CMD ["./main"]
