FROM node:6.5.0

# Maintainer
MAINTAINER Aksenchyk V. <aksenchyk.v@gmail.com>

# Define app directory
WORKDIR /usr/src/app

# Create app directory
RUN mkdir -p /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Copy client sources
COPY . /usr/src/app/
# Build client
RUN npm run build:dev

EXPOSE 3009

CMD [ "npm", "start"]