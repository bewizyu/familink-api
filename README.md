# Familink API

## Description
Training api project for the familink mobile application.

## Development

### Prerequisites

- Node.js v8+ must be installed
- MongoDB must be install

### Depencencies

- Clone this repository

- install npm dependencies

```
    npm i
```

### Environment

- There are 2 environments ([dev](config/dev.json), [prod](config/prod.json)) which are configurable by the `NODE_ENV` variable

```
    NODE_ENV=dev;
```

- MongoDB URI

```
    MONGODB_ADDON_URI=mongodb://localhost/familink;
```

- JWT hash secret (optional)

```
    JWT_SECRET=NikoJWT123456#@TEST
```

### Run API

```
    NODE_ENV=dev MONGODB_ADDON_URI=mongodb://localhost/familink JWT_SECRET=@test?- npm start
```


## API Documentation

- Postman file: `./postman/familink-api.postman_collection`
- [Authentication](documentation/authentication.md)
