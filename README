
# Person CRUD API

This RESTful API allows you to perform CRUD (Create, Read, Update, Delete) operations on a "person" resource. You can interact with the API using both the person's ID and name as parameters.

## Table of Contents
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Create a Person](#create-a-person)
  - [Get a Person](#get-a-person)
  - [Get All Persons](#get-all-persons)
  - [Update a Person](#update-a-person)
  - [Delete a Person](#delete-a-person)
- [Usage](#usage)
  - [Create a Person](#create-a-person-usage)
  - [Get a Person](#get-a-person-usage)
  - [Get All Persons](#get-all-persons-usage)
  - [Update a Person](#update-a-person-usage)
  - [Delete a Person](#delete-a-person-usage)

## Getting Started

1. Clone this repository to your local machine.

2. Install the required dependencies using `npm install`.

3. Start the server using `npm start`.

4. Ensure you have a MongoDB database running and set the `DB_URL` environment variable accordingly.

## Endpoints

### Create a Person

**Endpoint:** `POST /api`

**Description:** Create a new person.

**Input:**
```json
{
  "name": "John Doe"
}
```

**Expected Response (Example):**
```json
{
  "_id": "6097f0e5720f790041471b7e",
  "name": "john doe",
  "__v": 0
}
```

### Get a Person

**Endpoint:** `GET /api/:param`

**Description:** Get details of a person by their ID or name.

**Input:**
- Provide either the person's ID or name as `param` in the URL.

**Expected Response (Example):**
```json
{
  "_id": "6097f0e5720f790041471b7e",
  "name": "john doe",
  "__v": 0
}
```

### Get All Persons

**Endpoint:** `GET /api`

**Description:** Get details of all persons.

**Expected Response (Example):**
```json
[
  {
    "_id": "6097f0e5720f790041471b7e",
    "name": "john doe",
    "__v": 0
  },
  {
    "_id": "6097f0e5720f790041471b7f",
    "name": "jane smith",
    "__v": 0
  }
]
```

### Update a Person

**Endpoint:** `PUT /api/:param`

**Description:** Update details of a person by their ID or name.

**Input:**
```json
{
  "name": "Updated Name"
}
```

**Expected Response (Example):**
```json
{
  "_id": "6097f0e5720f790041471b7e",
  "name": "updated name",
  "__v": 0
}
```

### Delete a Person

**Endpoint:** `DELETE /api/:param`

**Description:** Delete a person by their ID or name.

**Input:**
- Provide either the person's ID or name as `param` in the URL.

**Expected Response (Example):**
```json
{
  "message": "Person deleted"
}
```

## Usage

### Create a Person (Usage)

To create a new person, send a `POST` request to `/api` with the person's name in the request body.

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe"}' http://localhost:5888/api
```

### Get a Person (Usage)

To get details of a person, send a `GET` request to `/api/:param`, replacing `:param` with either the person's ID or name.

```shell
# Get by ID
curl http://localhost:5888/api/6097f0e5720f790041471b7e

# Get by Name
curl http://localhost:5888/api/john%20doe
```

### Get All Persons (Usage)

To get details of all persons, send a `GET` request to `/api`.

```shell
curl http://localhost:5888/api
```

### Update a Person (Usage)

To update a person's details, send a `PUT` request to `/api/:param`, replacing `:param` with either the person's ID or name, and provide the updated data in the request body.

```shell
# Update by ID
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Name"}' http://localhost:5888/api/6097f0e5720f790041471b7e

# Update by Name
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Name"}' http://localhost:5888/api/john%20doe
```

### Delete a Person (Usage)

To delete a person, send a `DELETE` request to `/api/:param`, replacing `:param` with either the person's ID or name.

```shell
# Delete by ID
curl -X DELETE http://localhost:5888/api/6097f0e5720f790041471b7e

# Delete by Name
curl -X DELETE http://localhost:5888/api/john%20doe
```