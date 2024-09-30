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
# $ docker image build --target prod -t chess_back_prod ./back
# $ docker container run -p 8080:8080 chess_back_prod

FROM golang:1.23-alpine AS base
RUN go install github.com/air-verse/air@latest
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
EXPOSE 8080
RUN go build -o main .

FROM base AS dev
CMD ["air"]

FROM gcr.io/distroless/static-debian11 AS prod
COPY --from=base /app /
CMD ["./main"]
