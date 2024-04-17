# Proyecta Web App
This repository contains a React Web App.

## Technologies in this repo:
* React 18.0.2
* Bootstrap 5.3.0
* Axios 1.4.0
* React Router DOM 6.11.1

## Docker Containers
#### Create the image
```sh
docker build -t proyecta/web-react-dev:latest --build-arg API_URL=https://localhost:5100 -f Dockerfile-dev .
docker build -t proyecta/web-react-prod:latest --build-arg API_URL=https://localhost:5100 -f Dockerfile-prod .
```

#### Run containers
```sh
docker run -d --name proyecta_web_react_dev -p 3100:3000 proyecta/web-react-dev
docker run -d --name proyecta_web_react_prod -p 3101:80 proyecta/web-react-prod
```
