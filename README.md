# node-api-boilerplate

## Overview
A modern starting point for nodeJS API backends.

## Features
- Authentication, role based permissions, CRUD Users
  - Login, Logout, Signup, Session
  - ( Create / Update / Get / Delete / List ) ~> User
  - Admin and logged in protected APIs.

- API testing with Jest, all API endpoints covered
- Health Check


| Method | Url            | Params|
| ------ | -------------- | ----- |
| POST   | /api/users     | email, password_hash, roles |
| PATCH  | /api/users/:id | email, password_hash, roles |
| GET    | /api/users/:id | |
| GET    | /api/users     | |
| DELETE | /api/users/:id | |



