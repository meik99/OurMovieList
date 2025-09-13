# Stage 1: Build the Angular app
FROM node:24 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-prod

# Stage 2: Serve with Nginx
FROM nginx

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
