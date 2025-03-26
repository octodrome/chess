# Welcome to Nuxt Chess

This project started as a frontend portfolio app I worked on during my freelance developer days. Over time, it grew into an opportunity to learn and practice every part of the development process—UI/UX design, frontend, backend, and DevOps. My goal is to build a fully functional online chess game, combining real-world chess mechanics with modern web technologies, while growing full-stack skills.

-   🎮 Play it online: https://nuxtchess.com
-   📉 Follow the project board: https://github.com/orgs/octodrome/projects/3
-   🕵️‍♂️ Explore the code on github: https://github.com/octodrome/chess
-   💻 Connect with me: https://www.linkedin.com/in/colin-faivre

![cover image](./documentation/nuxtchess.gif?raw=true)

## 👾 Tech Stack

![alt text](./documentation/diagrams/stack.png?raw=true)

![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Nuxt.js](https://img.shields.io/badge/Nuxt3-002E3B?style=flat&logo=nuxtdotjs&logoColor=#00DC82)
![Go](https://img.shields.io/badge/Go-%2300ADD8.svg?style=flat&logo=go&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-%2300ADD8.svg?style=flat&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat&logo=postgresql&logoColor=white)

## 🥷 Run Nuxt Chess locally

Use the provided [docker-compose.yml](/docker-compose.yml) to get started:

```bash
docker compose up
```

## 🚀 Continuous Integration and Deployment

![alt text](./documentation/diagrams/environments.png?raw=true)

The Nuxt Chess app uses an automated pipeline to streamline the process from code changes to a live production environment: [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml)

The pipeline leverages [**GitHub Actions**](https://github.com/features/actions) for continuous integration and deployment, [**Docker Hub**](https://hub.docker.com/) for container images storage, a small droplet on [**DigitalOcean**](https://www.digitalocean.com/) for hosting the application and [**Docker Compose**](https://docs.docker.com/compose/) as a first easy solution to run the prod containers. The key stages include building, testing, and deploying the application across the frontend, rest-server, and socket-server components.

## Prod Environment

![alt text](./documentation/diagrams/prod_env.png?raw=true)
