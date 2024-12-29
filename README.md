# Welcome to Chess

This project started as a frontend portfolio app I worked on during my freelance developer days. Over time, it grew into an opportunity to learn and practice every part of the development process—UI/UX design, frontend, backend, and DevOps. My goal is to build a fully functional online chess game, combining real-world chess mechanics with modern web technologies, while growing full-stack skills.

-   🎮 Play it online: http://165.22.119.201/
-   📉 Follow the project board: https://github.com/orgs/octodrome/projects/3
-   🕵️‍♂️ Explore the code on github: https://github.com/octodrome/chess
-   💻 Connect with me: https://www.linkedin.com/in/colin-faivre/

![alt text](./documentation/app_screenshot.png?raw=true)

## 👾 Tech Stack

![alt text](./documentation/chess_stack.png?raw=true)

![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Nuxt.js](https://img.shields.io/badge/Nuxt3-002E3B?style=flat&logo=nuxtdotjs&logoColor=#00DC82)
![Go](https://img.shields.io/badge/Go-%2300ADD8.svg?style=flat&logo=go&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-%2300ADD8.svg?style=flat&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat&logo=postgresql&logoColor=white)

## 🥷 Run Chess locally

1. **Install Docker**:  
   Follow the installation guide for your operating system:  
   https://docs.docker.com/desktop/install/linux/ubuntu/
2. **Clone the project**:

    ```bash
    git clone https://github.com/octodrome/chess.git
    cd chess
    ```

3. **Run the project locally**:  
   Use the provided [docker-compose.yml](/docker-compose.yml) to get started:
    ```bash
    docker compose up
    ```

## Continuous Integration and Deployment

![alt text](./documentation/ci-cd.png?raw=true)

The Chess app uses an automated pipeline to streamline the process from code changes to a live production environment: [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml)

The pipeline leverages [**GitHub Actions**](https://github.com/features/actions) for continuous integration and deployment, [**Docker Hub**](https://hub.docker.com/) for container images storage, a small droplet on [**DigitalOcean**](https://www.digitalocean.com/) for hosting the application and [**Docker Compose**](https://docs.docker.com/compose/) as a first easy solution to run the prod containers. The key stages include building, testing, and deploying the application across the frontend, backend, and socket-server components.
