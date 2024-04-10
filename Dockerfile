# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm ci

# Copy the source code
COPY . .

# Set environment variables for the build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Print the value of REACT_APP_API_URL
RUN echo "REACT_APP_API_URL is '${REACT_APP_API_URL}'"

# Build the application
RUN npm run build


# Stage 2: Serve the application from Nginx
FROM nginx:alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
