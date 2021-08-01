# G2i Node Test

The main purpose of this repository is to build a good project setup and workflow for writing a Node api rest in TypeScript using Express and a NoSQL DB.

When running the project locally, being `.env` file config the very same as `.example.env` file, the server docs will be deployed at: `http:localhost:3000/, and the bearer token for authorization should be as follows:

HEADER (LOCALHOST BASED ON DEFAULT SECRET KEY 'your-secret-whatever')

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSmF2aWVyIEF2aWxlcyIsImVtYWlsIjoiYXZpbGVzbG9wZXouamF2aWVyQGdtYWlsLmNvbSJ9.rgOobROftUYSWphkdNfxoN2cgKiqNXd4Km4oz6Ex4ng
```

| method                                                                   | resource                                  | description                                                                                     |
| :----------------------------------------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `GET`                                                                    | `/`                                       | Simple running message response                                                                 |
| `GET`                                                                    | `/acronym?from=0&limit=10&search=:search` | returns a collection of fuzzy search acronyms present in the DB                                 |
| `POST`                                                                   | `/acronym`                                | creates an acronym in the DB (object acronym to be includued request's body)                    |
| `PUT`                                                                    | `/acronym/:acronymName`                   | updates an already created acronym in the DB (object acronym to be includued in request's body, |
| JWT token acronym ID must be the same as the acronym you want to update) |
| `DELETE`                                                                 | `/acronym/:acronymName`                   | deletes an acronym from the DB (JWT token acronym ID must be the                                |

same as the acronym you want to delete)

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

## With Docker

A docker-compose file has been added to the project with a Mongoose (already setting mongoose config options as expecting).

It is as easy as go to the project folder and execute the command 'docker-compose up' once you have Docker installed, and both the mongoose and express servers will be running in ports 27017 and 3000 respectively with all the config you need to start playing around.

## Locally

- Install dependencies

```
cd <project_name>
npm install
```

- Run the project in debug mode

```
NODE_ENV=development npm run debug
```

- Run the project with default script

```
NODE_ENV=development npm run start
```

- Run automated tests

```
npm run test
```

## Environment variables

This project is using five variables at the moment:

- NODE_LOCAL_PORT -> port where express server will be started on
- JWT_SECRET -> secret value, JWT tokens should be signed with this value
- MONGO_DOCKER_URI -> Docker DB connection data in connection-string format.
- MONGO_LOCAL_URI -> Local DB connection data in connection-string format.
- MONGO_LOCAL_PORT -> port where the db server will be started on

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

| Name                                 | Description                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **dist**                             | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**                     | Contains all your npm dependencies                                                                         |
| **src**                              | Contains your source code that will be compiled to the dist dir                                            |
| **src**/app.ts                       | Entry point to your Express app                                                                            |
| **test**/**acronym**/acronym.test.ts | Automation test files                                                                                      |
| package.json                         | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| docker-compose.yml                   | Docker Mongoose and Express images in case you want to load the db from Docker                             |
| tsconfig.json                        | Config settings for compiling server code written in TypeScript                                            |
| .example.env                         | Env variables file example to be renamed to .env                                                           |
| Dockerfile and dockerignore          | The app is dockerized to be deployed in a more standard way, needed for dev                                |
