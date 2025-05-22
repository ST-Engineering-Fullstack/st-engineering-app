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

# Build the app
RUN npm run build

# Stage-2
FROM nginx:1.25.2-alpine-slim

# Copy the built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]