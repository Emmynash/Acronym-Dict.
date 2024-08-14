# Acronym Dictionary

| method                                                                   | resource                                  | description                                                    |
| :----------------------------------------------------------------------- | :---------------------------------------- | :------------------------------------------------------------- |
| `GET`                                                                    | `/`                                       | Simple running message response                                |
| `GET`                                                                    | `/acronym?from=0&limit=10&search=:search` | returns a collection of fuzzy search acronyms                  |
| `POST`                                                                   | `/acronym`                                | creates an acronym (obj acronym to be includued request body)  |
| `PUT`                                                                    | `/acronym/:acronymName`                   | updates an acronym (obj acronym & valid JWT token is required) |
| `DELETE`                                                                 | `/acronym/:acronymName`                   | deletes an acronym (valid JWT token is required)

## Pre-reqs

To build and run this app locally you will need:

- Install [Node.js](https://nodejs.org/en/)

## Features:

- Express
- Mongoose (NoSQL DB) with basic CRUD included
- Express-validator
- Docker-compose ready to go
- mocha - test module

## Included middleware:

- Winston Logger
- JWT auth
- Helmet (security headers)
- CORS

# Getting Started

When running the project locally, being `.env` file config the very same as `.example.env` file, the server docs will be deployed at: `http:localhost:3000/, and the bearer token for authorization should be as follows:

HEADER (LOCALHOST BASED ON DEFAULT SECRET KEY 'your-secret-whatever')

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSmF2aWVyIEF2aWxlcyIsImVtYWlsIjoiYXZpbGVzbG9wZXouamF2aWVyQGdtYWlsLmNvbSJ9.rgOobROftUYSWphkdNfxoN2cgKiqNXd4Km4oz6Ex4ng
```

##  Docker

Run 'docker-compose up' once you have Docker installed, and both the mongoose and express servers will be running in ports 27017 and 3000 respectively.

##  Run automated tests
npm run test

## Environment variables

This project is using five variables at the moment:

- NODE_LOCAL_PORT -> port where express server will be started on
- JWT_SECRET -> secret value, JWT tokens should be signed with this value
- MONGO_DOCKER_URI -> Docker DB connection data in connection-string format.
- MONGO_LOCAL_URI -> Local DB connection data in connection-string format.
- MONGO_LOCAL_PORT -> port where the db server will be started on

## Project Structure

The full folder structure of this app is explained below:

| Name                                 | Description                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **dist**                             | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**                     | Contains all your npm dependencies                                                                         |
| **src**                              | Contains your source code that will be compiled to the dist dir                                            |
| **src**/app.ts                       | Entry point to your Express app                                                                            |
| **test**/**acronym**/acronym.test.ts | Automation test files                                                                                      |
| package.json                         | File that contains npm dependencies                                                                        |
| docker-compose.yml                   | Docker Mongoose and Express images in case you want to load the db from Docker                             |
| tsconfig.json                        | Config settings for compiling server code written in TypeScript                                            |
| .example.env                         | Env variables file example to be renamed to .env                                                           |
| Dockerfile and dockerignore          | The app is dockerized to be deployed in a more standard way, needed for dev                                |
