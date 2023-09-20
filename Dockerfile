# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

# Install dependencies
RUN yarn install

# Copy the source code
COPY . .

# Build the React app with overridden environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the application
RUN yarn build


# Stage 2: Serve the React application from Nginx
FROM nginx:alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
