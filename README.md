# PokéMuch

This is a simple test repository for a front-end test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

## Project Deploy (Docker)

Build it
```
docker build -t eduruiz/pokemuch .
```

### Run
```
docker run -it -p 8080:80 --rm --name challange eduruiz/pokemuch
```

It should be up and running on port 8080
