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
| POST   | /api/users     | email, password_hash, roles | Create a new user |
| PATCH  | /api/users/:id | email, password_hash, roles | Update user |
| GET    | /api/users/:id | | Get user |
| GET    | /api/users     | | Get list of users |
| DELETE | /api/users/:id | | Delete a user |
