# Stage 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app
ENV NODE_ENV production

# Build
COPY package.json /app
COPY package-lock.json /app
RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Serve React app with Nginx
FROM nginx:1.25.0-alpine as final
EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]