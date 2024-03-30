# Use Node.js 14 Alpine image
FROM node:14-alpine

# Set working directory and create it
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install

# Copy application code
COPY . .

# Expose port 3001
EXPOSE 3001

# Change ownership to node user
RUN chown -R node /usr/src/app
USER node

# Command to start the application
CMD ["npm", "start"]
