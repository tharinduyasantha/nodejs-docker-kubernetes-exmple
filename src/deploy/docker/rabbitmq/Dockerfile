FROM node:14

# Set the working directory
WORKDIR /app

# Copy everything from the root directory to the working directory in the container
COPY ../../../ ./

# Install dependencies
RUN npm install

COPY . .
# Expose the necessary port
EXPOSE 6767

# Start the application
CMD ["npm", "start"]

##docker build -t nodejs-app:1.0 -f src/deploy/docker/Dockerfile .
##docker run -p 3000:3000 nodejs-app:1.0
