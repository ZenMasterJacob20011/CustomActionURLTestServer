FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install --quiet && npm install typescript -g
COPY . .
RUN tsc
CMD npm start