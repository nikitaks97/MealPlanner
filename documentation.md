# Meal Planner Application Documentation

## Overview
The Meal Planner is a full-stack web application designed to help users plan meals, manage recipes, and organize shopping lists. It features a React-based client and a Node.js/Express backend API server, both containerized for easy deployment. The application supports modern CI/CD workflows, automated testing, and can be deployed seamlessly to cloud environments using Docker Compose.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Backend API Server](#backend-api-server)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Testing](#testing)
6. [Building](#building)
7. [Running Locally](#running-locally)
8. [Running with Docker Compose](#running-with-docker-compose)
9. [CI/CD Pipeline](#cicd-pipeline)
10. [SonarQube Integration](#sonarqube-integration)
11. [Deployment to AWS EC2](#deployment-to-aws-ec2)

---

## Project Structure
```
MealPlanner-main/
├── client/           # React frontend
│   ├── src/          # Source code
│   ├── build/        # Production build output
│   ├── Dockerfile    # Client Dockerfile
│   └── ...
├── server/           # Node.js/Express backend
│   ├── index.js      # Server entry point
│   ├── Dockerfile    # Server Dockerfile
│   └── ...
├── docker-compose.yml
├── package.json      # Root scripts
└── ...
```

---

## Backend API Server
The backend API server is built with **Node.js** and **Express**. It provides RESTful endpoints for managing meals, recipes, and shopping lists. The server is responsible for handling all data operations and serves as the main API for the React client.

### Key Features
- **RESTful API** for CRUD operations on meals, recipes, and shopping list items
- **Express.js** for routing and middleware
- **CORS** and JSON body parsing enabled
- **Health check endpoint** for deployment verification
- **Containerized** for easy deployment with Docker

### Main Endpoints
- `GET /api/meals` — Retrieve all meals
- `POST /api/meals` — Add a new meal
- `GET /api/recipes` — Retrieve all recipes
- `POST /api/recipes` — Add a new recipe
- `GET /api/shopping-list` — Retrieve shopping list items
- `POST /api/shopping-list` — Add an item to the shopping list
- `GET /health` — Health check endpoint (used in CI/CD and deployment)

### Running the Server
- **Locally:**
  ```sh
  cd server
  npm start
  ```
  The server will run on `http://localhost:5000` by default.

- **With Docker Compose:**
  The server is started automatically as part of the `docker-compose up` process.

- **Testing:**
  The server includes Vitest-based tests for all main endpoints. Run with:
  ```sh
  cd server
  npm test
  ```

- **Integration:**
  The React client communicates with the backend API via relative `/api/*` endpoints. In production, both are served behind Docker Compose networking.

---

## Prerequisites
- **Node.js** (v18.x recommended)
- **npm** (v8.x or higher)
- **Docker** and **Docker Compose** (for containerized deployment)
- (Optional) **AWS CLI** and credentials for cloud deployment

---

## Installation
### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd MealPlanner-main
```

### 2. Install Dependencies
Install dependencies for both client and server:
```sh
cd client && npm install
cd ../server && npm install
```
Or, from the root (if using workspaces):
```sh
npm install
```

---

## Testing
### 1. Run All Tests
Both client and server use **Vitest** for testing.

#### From the root directory:
```sh
# Run client tests
cd client && npm test

# Run server tests
cd ../server && npm test
```

#### Or, if you have scripts in the root package.json:
```sh
npm run test:client
npm run test:server
```

---

## Building
### 1. Build the Client
```sh
cd client
npm run build
```
This creates a production-ready build in `client/build/`.

### 2. (Optional) Build the Server
The server is ready to run as-is (no build step needed for Node.js), but you can use Docker for production builds.

---

## Running Locally (Without Docker)
### 1. Start the Server
```sh
cd server
npm start
```
By default, the server runs on `http://localhost:5000`.

### 2. Start the Client
```sh
cd client
npm start
```
By default, the client runs on `http://localhost:3000` and proxies API requests to the server.

---

## Running with Docker Compose
### 1. Build and Start All Services
From the project root:
```sh
docker-compose up --build
```
- The client will be available at `http://localhost:3000`
- The server will be available at `http://localhost:5000`

### 2. Stopping the Application
```sh
docker-compose down
```

---

## CI/CD Pipeline
- The project includes a GitHub Actions workflow for automated build, test, SonarQube scan, and deployment.
- The workflow installs dependencies, runs tests, builds the client, and deploys to AWS EC2 using Docker Compose.
- See `.github/workflows/workflow.yml` for details.

---

## SonarQube Integration
- The workflow includes a SonarQube scan step for code quality analysis.
- Requires `SONAR_TOKEN` and `SONAR_HOST_URL` secrets in your GitHub repository.

---

## Deployment to AWS EC2 (via GitHub Actions)
1. **Configure AWS and EC2 secrets** in your GitHub repository:
   - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
   - `EC2_USER`, `EC2_IP`, `EC2_SSH_PRIVATE_KEY`
2. **Push to main branch** or trigger the workflow manually.
3. The workflow will:
   - Build and test the app
   - Run SonarQube scan
   - SSH into your EC2 instance
   - Install Docker and Docker Compose if needed
   - Copy application files
   - Start the app using Docker Compose
   - Perform health checks

---

## Additional Notes
- **Environment Variables:** Configure any required environment variables in your Docker Compose or server/client `.env` files.
- **Health Checks:** The workflow performs basic health checks on both client and server after deployment.
- **Troubleshooting:** Check GitHub Actions logs and EC2 instance logs for any deployment issues.

---

For further details, see the `DEPLOYMENT.md` and workflow files in the repository.
