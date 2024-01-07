FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./swagger.js ./swagger.js
COPY ./controllers ./controllers
COPY ./middleWare ./middleWare
COPY ./models ./models
COPY ./routes ./routes
COPY ./UP-Growth ./UP-Growth
COPY ./utils ./utils
RUN npm install 
EXPOSE 5000
CMD ["node", "server.js"]