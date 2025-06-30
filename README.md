# CNpTask

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Set up

use Node v22

```sh
npm i
```

```sh
docker compose up -d
```

Generate graphql types
```sh
 nx run graphql:codegen
```

## Run development
Backend
```sh
nx run api:serve:development
```

populate db
```sh
node seedStarships.js
```

Frontend
```sh
nx run web:dev
```


## Run tests
```sh
nx run-many --all --target=test --parallel
```


## Build and run production
Backend
```sh
nx run api:build
```
```sh
nx run api:serve:production
```

Frontend
```sh
nx run web:build
```
```sh
nx run web:start
```
