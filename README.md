# Proyecta App
A React web app.

## Technologies in this repo:
* React 18.0.2
* Bootstrap 5.3.0

## Docker Containers
#### Create the image
```sh
docker build --build-arg REACT_APP_API_URL=https://localhost:8000 -t proyecta_app_react:latest .
```

#### Run containers
```sh
docker compose -f docker-compose-dev.yml up -d
```
