################################
#### IMAGE DOCUMENTATION 🐳 ####
################################
# - dev and prod inspiration: https://www.horsfallnathan.com/blog/golang-docker-setup-for-development-and-production-with-multistage-builds
# - Google distroless in prod https://github.com/GoogleContainerTools/distroless

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
RUN go build -o main .

FROM base AS dev
RUN go install github.com/onsi/ginkgo/ginkgo
EXPOSE 8001
CMD ["./main"]

FROM gcr.io/distroless/static-debian11 AS prod
COPY --from=base /app /
EXPOSE 8001
CMD ["./main"]
