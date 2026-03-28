# Use a lightweight Nginx image
FROM nginx:alpine

# Copy the static site files to the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default command will start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
