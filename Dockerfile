FROM node:12

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

EXPOSE 9555

RUN yarn build

ENV NODE_EVN=production

CMD [ "node", "dist/server.js" ]
