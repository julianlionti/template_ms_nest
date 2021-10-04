FROM node:14-alpine as dev

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

COPY . . 

RUN npx nest build token

FROM node:14-alpine as prod

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=dev /usr/app/src/dist ./dist

CMD ["node", "dist/apps/token/main.js"]

# CMD ["node", "dist/apps/token/main.js"]
