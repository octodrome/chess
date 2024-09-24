# https://hub.docker.com/_/golang
# https://docs.docker.com/guides/language/golang/build-images/
# $ docker build --tag <image_tag> .
# $ docker container run <image_tag>
FROM golang:1.23-alpine

WORKDIR /app
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN go build -o main .
EXPOSE 8080

CMD ["./main"]
