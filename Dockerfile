FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 443
CMD [ "npm", "start" ]
