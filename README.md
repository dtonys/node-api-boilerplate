# :white_circle: Node API Boilerplate

## Overview

A modern nodejs API boilerplate, built on top of Express + MongoDB.

See [API Docs](https://github.com/dtonys/node-api-boilerplate#api) for functionality.

**Live Examples**:
  - [health check](http://api.universalboilerplate.com/)
  - [user detail](http://api.universalboilerplate.com/api/users/5a6c9bf7804ca264a44e6627)

## Motivation

Node API Boilerplate leverages the power of modern javascript syntax and tooling to provide a clean, productive development environment.

This opinionated yet configurable boilerplate provides more control compared to "zero-configuration" tools that hide implementation details and often lock you into their way of doing things.

## Usage with web server

Your web server and API server should be in separate codebases, running on separate processes.

This decoupled approach ( as opposed to a monolithic approach like Ruby on Rails ) makes both the web and api service easier to organize, and provides a more scalable and performent architecture.

Use this in conjunction with [universal-web-boilerplate](https://github.com/dtonys/universal-web-boilerplate) to create universal, code split web apps.

For universal apps, the recommended approach is to use an API proxy to provide consistent API access to both the server and client:

https://github.com/dtonys/universal-web-boilerplate/blob/17282368130c1e5caf9c829ce5e3fd5bcc1f441e/src/server/server.js#L172

https://github.com/dtonys/universal-web-boilerplate/blob/17282368130c1e5caf9c829ce5e3fd5bcc1f441e/src/server/apiProxy.js

## Featuring

#### Webpack to compile modern javascript
  - async / await to simplify async control flow and error handling
  - import / export to enable modular javascript

#### Jest for a fast and pleasant testing experience
  - API integration tests run in parallel, each test connecting to a separate database instance.
  - Code coverage and watch mode out of the box

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

#### Download MongoDB and start on the default port (27017)

https://treehouse.github.io/installation-guides/mac/mongo-mac.html

#### Create a `.env` file with values below, and add to the project root
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