# Task Management Service

Task management service is a NodeJS application to provide functionalities as follows:

- Creating user
  - Updating password
  - Login
- Creating task
  - Updating task entry
  - Receiving tasks by userId
  - Filtering tasks by search criteria

## Setup

### Docker

#### Dev
- Install a docker engine like [docker desktop](https://www.docker.com/products/docker-desktop/)
- Navigate to the project folder
- Run `docker-compose up --build` command
- Hot reload is supported

#### Production
- Run `docker-compose -f docker-compose.prod.yml up --build` to run the production build

### NodeJS

- Install NodeJS 18
- Run `npm i` to install dependencies
- Run `npm run test` to install dependencies
- Provide dependencies via `.env` file
  - DB_CONNECTION_URL mongodb connection string
  - JWT_SECRET_KEY secret key for JWT encryption

Docker solution already initializes with a mongodb instance and provides a secret key.

## Tech Stack

- Typescript
- Express
- Ajv
- Mongoose
