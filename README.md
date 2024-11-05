# Chess

## Overview

Welcome to **Chess**! This project started as a **proof of concept**, aimed at exploring the entire development pipeline—from frontend to backend and DevOps. The goal is to build a fully functional online chess game, combining real-world chess mechanics with modern web technologies.

Users can seamlessly play chess directly in their browser, either against an AI opponent or in real-time with friends.

![alt text](./documentation/app_screenshot.png?raw=true)

Feel free to explore the app as it evolves:  
[http://165.22.119.201/](http://165.22.119.201/)

## Tech Stack

-   [**Front**](/front/README.md): [Typescript](https://www.typescriptlang.org/) - [Nuxt](https://nuxt.com/)
-   [**Back**](/back/README.md): [Go](https://go.dev/) - [Gin](https://gin-gonic.com/)
-   [**Socket-Server**](/socket-server/README.md): [Go](https://go.dev/)
-   [**Move Validation Library**](/chess-legal-moves/): [Typescript](https://www.typescriptlang.org/)
-   [**E2E Tests**](/e2e/): [Cypress](https://www.cypress.io/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)

## Setup and Play

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

## Contribution Workflow

1. **Select an issue**:  
   Find a task you'd like to contribute to: [Project Board](https://github.com/orgs/octodrome/projects/3)

2. **Open a pull request**:  
   Use the provided PR template for consistency.

3. **Use conventional commits**:  
   Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for clear and meaningful commit messages.

4. **Follow the GitHub Flow**:  
   Learn more about the contribution process here: [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)

## Continuous Integration and Deployment

The Chess app uses an automated pipeline to streamline the process from code changes to a live production environment: [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml)

The pipeline leverages [**GitHub Actions**](https://github.com/features/actions) for continuous integration and deployment, [**Docker Hub**](https://hub.docker.com/) for container images storage, a small droplet on [**DigitalOcean**](https://www.digitalocean.com/) for hosting the application and [**Docker Compose**](https://docs.docker.com/compose/) as a first easy solution to run the prod containers. The key stages include building, testing, and deploying the application across the frontend, backend, and socket-server components.
