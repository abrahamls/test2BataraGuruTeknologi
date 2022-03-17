# API Documentation

## Models :

_User_

```
- email : string, required, unique
- password : string, required
```

_Pokemon_

```
- name : string
- url : string
```

&nbsp;

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /pokemons/:pokemonName`
- `GET /pokemons/`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /pokemons?page=

Description:
- fetch pokemones data from pokeapi.co

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon/10/"
    }
]
```

&nbsp;

## 4. GET /pokemons/:pokemonName

Description:
- Show pokemon details

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "pokemonName": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "abilities": [...],
  "base_experience": [...],
  "forms": [...],
  "game_indices": [...],
  ...,
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Pokemon not found"
}
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```


_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```