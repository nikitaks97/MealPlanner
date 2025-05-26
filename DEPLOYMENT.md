# MealPlanner Application - DevOps Guide

## Application Overview

MealPlanner is a full-stack JavaScript application with separate client and server components:

- **Frontend (client/)**: React.js application
- **Backend (server/)**: Node.js/Express.js REST API

## System Requirements

- Node.js (v16.x or v18.x recommended)
- npm (included with Node.js)
- Git

## Project Structure

```
MealPlanner/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
└── .github/
    └── workflows/         # CI/CD pipeline configurations
```

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MealPlanner
   ```

2. Setup Backend:
   ```bash
   cd server
   npm install
   npm start   # Starts server on port 5000
   ```

3. Setup Frontend:
   ```bash
   cd ../client
   npm install
   npm start   # Starts client on port 3000
   ```

## Environment Variables

### Server
- `PORT`: Server port (default: 5000)

### Client
- `PORT`: Client dev server port (default: 3000)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000)

## Building for Production

1. Build the client:
   ```bash
   cd client
   npm run build
   ```
   This creates a `build` directory with optimized production files.

2. Build the server:
   ```bash
   cd server
   npm run build  # If applicable
   ```

## Testing

### Running Tests
1. Server Tests:
   ```bash
   cd server
   npm test
   ```

2. Client Tests:
   ```bash
   cd client
   npm test
   ```

## CI/CD Pipeline

The application uses GitHub Actions for CI/CD. The pipeline:

1. **Triggers on**:
   - Push to main/master
   - Pull requests to main/master

2. **Test Job**:
   - Runs on multiple Node.js versions (16.x, 18.x)
   - Tests both client and server
   - Must pass before build/deploy

3. **Build Job**:
   - Runs only on main/master branch pushes
   - Builds both client and server
   - Creates artifacts for deployment

## Deployment

### Prerequisites
- Node.js 16.x or 18.x
- npm
- Process manager (e.g., PM2) for production

### Production Deployment Steps

1. Install dependencies:
   ```bash
   # Server
   cd server
   npm ci --production

   # Client
   cd ../client
   npm ci --production
   ```

2. Build client:
   ```bash
   npm run build
   ```

3. Start server:
   ```bash
   cd ../server
   node index.js
   ```

### Using PM2 (Recommended)

1. Install PM2:
   ```bash
   npm install -g pm2
   ```

2. Start application:
   ```bash
   cd server
   pm2 start index.js --name "meal-planner"
   ```

3. Monitor application:
   ```bash
   pm2 status
   pm2 logs meal-planner
   ```

## Health Monitoring

- Server health check endpoint: `GET /api/health`
- Monitor memory usage and CPU with PM2
- Set up application monitoring (e.g., New Relic, Datadog)

## Backup Strategy

1. Database: Currently using in-memory storage, implement persistent storage
2. Code: Maintained in Git repository
3. Environment configs: Store securely in environment variables or secure vault

## Security Considerations

1. Implement rate limiting
2. Use HTTPS in production
3. Keep dependencies updated
4. Implement proper CORS policies
5. Add security headers

## Troubleshooting

Common issues and solutions:

1. **Port conflicts**:
   - Check if ports 3000 or 5000 are in use
   - Change ports using environment variables

2. **Build failures**:
   - Clear node_modules and package-lock.json
   - Reinstall dependencies
   - Check Node.js version compatibility

3. **API Connection Issues**:
   - Verify API URL in client configuration
   - Check CORS settings in server
   - Verify network connectivity

## Support

For technical issues:
1. Check server logs
2. Check client console
3. Review GitHub Actions build logs
4. Check system resources (memory, CPU)

## Future Improvements

1. Add container support (Docker)
2. Implement database persistence
3. Add API documentation (Swagger/OpenAPI)
4. Set up monitoring and alerting
5. Implement automated database backups
