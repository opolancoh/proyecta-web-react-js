# Proyecta App
A React web app.

## Technologies in this repo:
* React 18.0.2
* Bootstrap 5.3.0

## Docker Containers
#### Create the image
```sh
docker build --build-arg API_URL=https://localhost:8000 --build-arg ENVIRONMENT=development -t proyecta_app_react_dev:latest .
```

#### Run containers
```sh
docker run -d --name proyecta_app_react_dev -p 3100:80 proyecta_app_react_dev
```
