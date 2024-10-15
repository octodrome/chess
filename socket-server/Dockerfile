################################
#### IMAGE DOCUMENTATION 🐳 ####
################################

##########################
### Test dev container ###
# $ docker image build --target dev -t chess_socket_server_dev ./back
# $ docker container run -p 5000:5000 chess_socket_server_dev

##########################
### Test prod container ##
# $ docker image build --target prod -t colinfaivre/chess_socket_server_prod ./back
# $ docker container run -p 5000:5000 chess_socket_server_prod
# $ docker image push colinfaivre/chess_socket_server_prod

FROM golang:1.23-alpine AS base
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

FROM base AS dev
RUN go build -o main .
# RUN go install github.com/onsi/ginkgo/ginkgo
EXPOSE 5000
CMD ["./main"]

FROM base AS prod
ENV FRONT_URL=http://165.22.119.201
RUN go build -o main .
EXPOSE 5000
CMD ["./main"]
