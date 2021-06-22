<h1 align="center">Api</h1>

## Description

Api Implementation.

## Requirements

1. [Node.JS](https://github.com/nvm-sh/nvm) LTS version (v14.16.0)
2. [Docker](https://www.docker.com)

## Docker

````bash
# mongo
$ docker pull mongo
$ docker run --name api-mongo --publish 27017:27017 -d mongo
````

## Installation

```bash
$ npm ci
````

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app via docker

```bash
# start containers
$ ./dcp start

# restart containers
$ ./dcp restart

# destroy the docker containers
$ ./dcp destroy

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
