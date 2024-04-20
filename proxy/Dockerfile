FROM nginx

# Remove default nginx.conf
RUN rm /etc/nginx/nginx.conf

# Copy custom nginx.conf from host to container
COPY nginx.conf /etc/nginx/nginx.conf

# Set appropriate permissions for the new nginx.conf file
RUN chown root:root /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/nginx.conf

# Drop privileges and run nginx as a non-root user
USER nginx

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
