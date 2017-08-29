FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/hello21-pac-server
WORKDIR /usr/src/hello21-pac-server

# Install app dependencies
COPY package.json /usr/src/hello21-pac-server/
#RUN npm config set registry https://registry.npm.taobao.org && yarn install

# Bundle app source
COPY . /usr/src/hello21-pac-server

EXPOSE 3000
CMD [ "npm", "start" ]
