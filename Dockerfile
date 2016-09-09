FROM node:6.3

# File Author / Maintainer
MAINTAINER Aksenchyk V. <aksenchyk.v@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source
COPY . /usr/src/app

# Install dependencies and build client
RUN \ 
    npm install \    
    && npm run build:prod


CMD [ "npm", "start" ]
