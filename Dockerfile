#FROM node:lts-alpine

#WORKDIR /app

# from project folder to app container
#COPY . .

# copying package json to app folder
#COPY package*.json ./

# starting server and building frontend
#RUN npm install --only=production
#RUN npm build --prefix client


#COPY  /server /server

# for security reason and less priveleages than root user
#USER node 


# running server
#CMD [ "npm", "start", "--prefix", "server" ]

# port to made available outside our existing container to the internet
#EXPOSE 8000 


FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000