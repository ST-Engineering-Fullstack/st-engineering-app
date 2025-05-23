# Stage-1 & specify a name 'builder'
FROM node:latest AS builder

# Create a directory and go to the directory 
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create .env file with 0.0.0.0 URL for browser requests
RUN echo "VITE_PORT=3002" > .env && \
    echo "VITE_APP_TITLE=ST Engineering App" >> .env && \
    echo "VITE_API_URL=http://0.0.0.0:4000/api" >> .env

# Build the app
RUN npm run build

# Stage-2
FROM nginx:1.25.2-alpine-slim

# Copy the built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]