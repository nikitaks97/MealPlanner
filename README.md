# Meal Planner Application

**Full-stack Meal Planner web application for organizing recipes, planning meals, and managing shopping lists with React frontend and Node.js backend.**

## 📋 Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Development](#development)
7. [Testing](#testing)
8. [Building](#building)
9. [Docker Deployment](#docker-deployment)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Production Deployment](#production-deployment)
12. [API Documentation](#api-documentation)
13. [Troubleshooting](#troubleshooting)

## 🚀 Overview

The Meal Planner is a full-stack web application designed to help users plan meals, manage recipes, and organize shopping lists. It features a React-based client and a Node.js/Express backend API server, both containerized for easy deployment. The application supports modern CI/CD workflows, automated testing, and can be deployed seamlessly to cloud environments using Docker Compose.

### Key Features
- **Meal Planning**: Plan meals for different days and times
- **Recipe Management**: Store and organize favorite recipes
- **Shopping Lists**: Generate and manage shopping lists
- **Responsive Design**: Works on desktop and mobile devices
- **Containerized Deployment**: Easy deployment with Docker
- **Automated CI/CD**: GitHub Actions pipeline for testing and deployment

## 🛠 Tech Stack

- **Frontend**: React 18.x, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **Testing**: Vitest
- **Containerization**: Docker, Docker Compose
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions
- **Code Quality**: SonarQube integration

## 📁 Project Structure

```
MealPlanner/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   ├── build/             # Production build output
│   ├── Dockerfile         # Client Dockerfile
│   ├── nginx.conf         # Nginx configuration
│   ├── vitest.config.js   # Vitest configuration for client tests
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── index.js          # Server entry point
│   ├── index.test.js     # Server tests
│   ├── Dockerfile        # Server Dockerfile
│   ├── vitest.config.js  # Vitest configuration for server tests
│   └── package.json      # Backend dependencies
├── .github/
│   └── workflows/        # CI/CD pipeline configurations
│       ├── workflow.yml  # Main CI/CD pipeline with AWS EC2 deployment
│       └── ci-cd.yml     # Alternative CI/CD pipeline
├── docker-compose.yml    # Multi-service orchestration
├── Dockerfile            # Root-level multi-stage Dockerfile
├── .dockerignore         # Docker ignore file
├── DEPLOYMENT.md         # Deployment documentation
├── documentation.md      # Technical documentation
└── package.json          # Root workspace configuration
```

## 📋 Prerequisites

- **Node.js** (v16.x or v18.x recommended)
- **npm** (v8.x or higher)
- **Docker** and **Docker Compose** (for containerized deployment)
- **Git** for version control
- (Optional) **AWS CLI** and credentials for cloud deployment

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MealPlanner
```

### 2. Install Dependencies
Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

Or, from the root using npm workspaces:
```bash
npm install
```

**Available root-level scripts:**
- `npm start` — Start both client and server concurrently  
- `npm run build` — Build both client and server
- `npm test` — Run tests for all workspaces
- `npm run test:client` — Run client tests only
- `npm run test:server` — Run server tests only

## 🔧 Development

### Local Development Setup

1. **Start the Backend Server**:
   ```bash
   cd server
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start the Frontend Client**:
   ```bash
   cd client
   npm start
   ```
   Client runs on `http://localhost:3000`

3. **Or run both simultaneously from root**:
   ```bash
   npm start
   ```
   This uses `concurrently` to start both client and server

### Environment Variables

#### Server
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

#### Client
- `PORT`: Client dev server port (default: 3000)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000)

## 🧪 Testing

### Running Tests

Both client and server use **Vitest** for testing.

1. **Server Tests**:
   ```bash
   cd server
   npm test
   ```

2. **Client Tests**:
   ```bash
   cd client
   npm test
   ```

### Test Coverage
The test suite includes:
- Unit tests for API endpoints
- Component tests for React components
- Integration tests for client-server communication

## 🏗 Building

### Build for Production

1. **Build the Client**:
   ```bash
   cd client
   npm run build
   ```
   This creates a production-ready build in `client/build/`.

2. **Build the Server**:
   The server is ready to run as-is (no build step needed for Node.js).

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Build and Start All Services**:
   ```bash
   docker-compose up --build
   ```
   - Client available at `http://localhost:3000`
   - Server available at `http://localhost:5000`

2. **Stop the Application**:
   ```bash
   docker-compose down
   ```

### Individual Container Builds

1. **Build Client Container**:
   ```bash
   cd client
   docker build -t mealplanner-client .
   ```

2. **Build Server Container**:
   ```bash
   cd server
   docker build -t mealplanner-server .
   ```

3. **Build Combined Application (Root Dockerfile)**:
   ```bash
   docker build -t mealplanner-full .
   ```
   This creates a single container with both client and server using multi-stage build.

## ⚙️ CI/CD Pipeline

The application uses **GitHub Actions** for automated CI/CD:

### Pipeline Features
- **Triggers**: Push/PR to main branch, manual workflow dispatch
- **Node.js**: Tests and builds with Node.js 18.x
- **Dependency Caching**: Faster builds with npm cache
- **SonarQube Integration**: Code quality analysis with organization `nikitaks97`
- **AWS EC2 Deployment**: Automated deployment with Docker installation
- **Health Checks**: Automated service health verification
- **Multi-stage Build**: Root-level Dockerfile for combined client/server build

### Pipeline Stages
1. **Build**: Install dependencies and create production builds using npm workspaces
2. **SonarQube**: Code quality analysis (requires `SONAR_TOKEN` and `SONAR_HOST_URL`)
3. **Deploy**: Automated EC2 deployment with Docker Compose (only on main branch)
4. **Health Check**: Verify deployment success on both client and server endpoints

## 🚀 Production Deployment

### Prerequisites
- Node.js 16.x or 18.x
- npm
- Process manager (e.g., PM2) for production

### Manual Deployment Steps

1. **Install Dependencies**:
   ```bash
   # Server
   cd server
   npm ci --production

   # Client
   cd ../client
   npm ci --production
   ```

2. **Build Client**:
   ```bash
   npm run build
   ```

3. **Start Server**:
   ```bash
   cd ../server
   node index.js
   ```

### Using PM2 (Recommended)

1. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

2. **Start Application**:
   ```bash
   cd server
   pm2 start index.js --name "meal-planner"
   ```

3. **Monitor Application**:
   ```bash
   pm2 status
   pm2 logs meal-planner
   ```

### AWS EC2 Deployment (via GitHub Actions)

The repository includes automated deployment to AWS EC2 with the main workflow:

1. **Configure Secrets** in GitHub repository:
   - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
   - `EC2_USER`, `EC2_IP`, `EC2_SSH_PRIVATE_KEY`
   - `SONAR_TOKEN`, `SONAR_HOST_URL`

2. **Deploy**: Push to main branch or trigger workflow manually

3. **Deployment Process**:
   - Build and test application with Node.js 18.x
   - Run SonarQube code quality scan
   - SSH into EC2 instance with retry logic
   - Install Docker and Docker Compose automatically if needed
   - Copy application files (docker-compose.yml, server/, client/)
   - Build and start containers with `docker-compose up --build -d`
   - Perform health checks on both server (port 5000) and client (port 3000)
   - Display deployment success with accessible URLs

4. **Health Checks**:
   - Server: `curl http://localhost:5000/health`
   - Client: `curl http://localhost:3000`

## 📚 API Documentation

### Backend API Endpoints

The server provides RESTful endpoints:

#### Meals
- `GET /api/meals` — Retrieve all meals
- `POST /api/meals` — Add a new meal (expects: `{ name, recipeId }`)
- `DELETE /api/meals/:id` — Delete a meal

#### Recipes
- `GET /api/recipes` — Retrieve all recipes
- `POST /api/recipes` — Add a new recipe (expects: `{ name }`)
- `DELETE /api/recipes/:id` — Delete a recipe

#### Shopping Lists
- `GET /api/shopping-list` — Retrieve shopping list items (optional query: `?recipeId=1`)
- `POST /api/shopping-list` — Add an item to shopping list (expects: `{ name, recipeId }`)
- `DELETE /api/shopping-list/:id` — Remove item from shopping list

#### Health Check
- `GET /health` — Health check endpoint (returns: `{ status: 'OK', timestamp: ISO_STRING }`)

#### Root Endpoint
- `GET /` — API information and available endpoints

### API Response Format
The API uses standard HTTP response codes and returns JSON. Example health check response:
```json
{
  "status": "OK",
  "timestamp": "2025-05-29T10:30:00.000Z"
}
```

Root endpoint provides API information:
```json
{
  "message": "Meal Planner API Server",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "meals": "/api/meals",
    "recipes": "/api/recipes",
    "shoppingList": "/api/shopping-list"
  }
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Check if ports 3000 or 5000 are in use
   - Change ports using environment variables
   - Kill existing processes: `lsof -ti:3000 | xargs kill -9`

2. **Build Failures**:
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall dependencies: `npm install`
   - Check Node.js version compatibility

3. **API Connection Issues**:
   - Verify API URL in client configuration
   - Check CORS settings in server
   - Verify network connectivity
   - Check server logs for errors

4. **Docker Issues**:
   - Ensure Docker daemon is running
   - Check container logs: `docker-compose logs`
   - Rebuild containers: `docker-compose up --build --force-recreate`

5. **CI/CD Pipeline Failures**:
   - Check GitHub Actions logs
   - Verify all required secrets are set
   - Ensure EC2 instance is accessible
   - Check SonarQube configuration

### Health Monitoring

- **Server Health**: `GET /health` endpoint
- **Container Health**: Docker health checks configured
- **Monitoring**: Use PM2 for process monitoring
- **Logs**: Check application and container logs

### Performance Optimization

- Use PM2 cluster mode for production
- Implement Redis for session storage
- Add database connection pooling
- Configure CDN for static assets
- Implement application monitoring (New Relic, Datadog)

## 🔒 Security Considerations

1. **Environment Variables**: Store sensitive data in environment variables
2. **HTTPS**: Use HTTPS in production
3. **Rate Limiting**: Implement API rate limiting
4. **CORS**: Configure proper CORS policies
5. **Dependencies**: Keep dependencies updated
6. **Security Headers**: Add security headers in Nginx
7. **Input Validation**: Validate all user inputs
8. **Authentication**: Implement user authentication (future enhancement)

## 🚀 Future Improvements

- [ ] Add database persistence (PostgreSQL/MongoDB)
- [ ] Implement user authentication and authorization
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement real-time features with WebSockets
- [ ] Add mobile app support
- [ ] Implement caching with Redis
- [ ] Add monitoring and alerting
- [ ] Implement automated database backups
- [ ] Add internationalization (i18n)
- [ ] Implement progressive web app (PWA) features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For technical issues:
1. Check server and client logs
2. Review GitHub Actions build logs
3. Check system resources (memory, CPU)
4. Create an issue in the repository

---

**Happy Coding! 🍽️**
