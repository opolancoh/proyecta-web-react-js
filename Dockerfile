# Fetching the node image on alpine linux
FROM node:18-alpine AS development
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV development

# Install dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm ci

# Copying all the files in our project
COPY . .

# Start the app
CMD npm start
