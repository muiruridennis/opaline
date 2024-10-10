# Image source
FROM node:20-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

# Build the TypeScript code
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:dev"]
