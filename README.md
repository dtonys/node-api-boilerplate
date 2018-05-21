# :white_circle: Node API Boilerplate

## Overview

A modern nodejs API boilerplate, built on top of Express + MongoDB.

See [API Docs](https://github.com/dtonys/node-api-boilerplate#api) for functionality.

**Live Examples**:
  - [health check](http://api.universalboilerplate.com/)
  - [user detail](http://api.universalboilerplate.com/api/users/5a6c9bf7804ca264a44e6627)

## Motivation

Node API Boilerplate provides a starting point for creating a backend web service with nodejs, utilizing modern javascript tools and standards.

## Usage with web server

This server is designed to be used as an API backend for a web or mobile service, and expects to be consumed by another process.

This decoupled approach ( as opposed to a monolithic approach where an API and web server live on the same process ) makes both the web and api service easier to organize, and provides a more scalable and performent architecture.

See [universal-web-boilerplate](https://github.com/dtonys/universal-web-boilerplate) to create universal, code split web apps.

## Updates
**5/21/2018** - Updated all npm dependencies to latest version.


## Featuring

#### Webpack to compile modern javascript in a node environment
  - async / await to simplify async control flow and error handling
  - import / export to enable javsascript modules

#### Jest for a fast and pleasant testing experience
  - API integration tests run in parallel, each test connecting to a separate database instance.
  - Code coverage and watch mode supported by jest out of the box

#### ESLint based on `eslint-config-airbnb` for fine grained control of code syntax and quality
  - Configured for a nodejs environment
  - IDE integration highly recommended


## Prerequisites

- nodejs, latest LTS - https://nodejs.org/en/
- Yarn - https://yarnpkg.com/en/

## Setup

#### Download the repo and install dependencies
`git clone https://github.com/dtonys/node-api-boilerplate && cd node-api-boilerplate`

`yarn`

#### Download MongoDB and run a local instance on the default port (27017)

https://treehouse.github.io/installation-guides/mac/mongo-mac.html

#### Create a `.env` file with values below, in project's root
NOTE: Substitute your own values as needed
```
API_PORT=3020
ENCRYPTION_SECRET=<SECRET_CODE>

MONGODB_DATABASE_NAME=auth_app
MONGODB_CONNECTION_URL=mongodb://localhost
```

#### Start the server in development mode
`npm run dev`

#### Build and run the server in production mode
`npm run build`

`npm run start`

#### Run API integration tests
`npm run test`

#### Run ESLint
`npm run lint-js`


## API

A modern API backend, with access to RESTful resources, authentication, and permissions.

### CRUD
| Method | Url            | Params| Notes |
| ------ | -------------- | ----- | ----- |
| POST   | /api/users     | email, password_hash, roles | Create a new user |
| PATCH  | /api/users/:id | email, password_hash, roles | Update user |
| GET    | /api/users/:id | | Get user |
| GET    | /api/users     | | Get list of users |
| DELETE | /api/users/:id | | Delete a user |

### Auth
| Method | Url            | Params| Notes |
| ------ | -------------- | ----- | ----- |
| POST   | /api/signup    | email, password | Signup a user and log them in |
| POST   | /api/login     | email, password | Log a user in |
| GET    | /api/logout    | | Log a user out |
| GET    | /api/session   | | Get current session info |

### Protected
| Method | Url            | Params| Notes |
| ------ | -------------- | ----- | ----- |
| GET    | /api/member/users | | Get list of users, logged-in only |
| GET    | /api/admin/users | | Get list of users, admin role only |


## External references

This boilerplate was created with inspiration from the following resources:

- backpack - https://github.com/jaredpalmer/backpack
- survivejs - https://github.com/survivejs-demos/webpack-demo
- react-redux-universal-hot-example - https://github.com/erikras/react-redux-universal-hot-example