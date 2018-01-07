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

## API
| Method | Url            | Params| Notes |
| ------ | -------------- | ----- | ----- |
| POST   | /api/users     | email, password_hash, roles | Get list of users |
| PATCH  | /api/users/:id | email, password_hash, roles | Update user |
| GET    | /api/users/:id | | Get user |
| GET    | /api/users     | | Get list of users |
| DELETE | /api/users/:id | |
|        |                |       |       |
| POST   | /api/signup    | email, password |
| POST   | /api/login     | email, password |
| GET    | /api/logout    | | |
| GET    | /api/session   | | Get current session info |
| GET    | /api/member/users | | Get list of users, logged in protected |
| GET    | /api/admin/users | | Get list of users, admin protected |
