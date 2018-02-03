# :white_circle: Node API Boilerplate

## Overview

A modern nodejs API boilerplate, built on top of Express + MongoDB.

See [API Docs](https://github.com/dtonys/node-api-boilerplate#api) for concrete list of features.

Take a look at some live API endpoints here:
  - [health check](http://api.universalboilerplate.com/)
  - [user list](http://api.universalboilerplate.com/api/users)

Use with [universal-web-boilerplate](https://github.com/dtonys/universal-web-boilerplate) to create web apps.

## Philosophy

For technically sound users who want control and a deep understanding of the code they write, the plethora of open source frameworks, scaffolding tools, and other automated abstractions do more harm than good.

These tools create a layer of complexity and magic by promoting "zero-configuration" setups accompanied by a custom command line client.

This is the anti-thesis of those projects, providing an explicit, configurable, foundation.

This project should serve as a blueprint for serious, production ready apps.  As configurable as it needs to be, but with smart defaults to get your started on the right track.

## About

A modern API backend, with access to RESTful resources, authentication, and permissions.  Honors standard conventions and best practices.

Node API Boilerplate leverages the power of modern javascript syntax and tooling to provide a clean, productive development environment.

#### Webpack to compile modern javascript
  - async / await to simplify async control flow and error handling
  - import / export to write modular javascript

#### Jest for a fast and pleasant testing experience
  - API integration tests run in parallel, each test connecting to a separate database instance.
  - Code coverage and watch mode out of the box

#### ESLint based on `eslint-config-airbnb` for fine grained control of syntax and code quality
  - Configured for a nodejs environment
  - Semicolons required
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
ENCRYPTION_SECRET=ZY6hYIkebSBVrpHgFRVWrResxUyM1jPQ

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

