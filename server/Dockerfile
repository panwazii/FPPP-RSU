FROM node:18.0.0-alpine as development

WORKDIR /usr/src/api

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18.0.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/api/build ./build

CMD ["node", "build/app.js"]