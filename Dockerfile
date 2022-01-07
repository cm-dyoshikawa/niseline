FROM node:16-alpine
LABEL Author="dyoshikawa"

WORKDIR /app
COPY packages/api/dist /app

ENTRYPOINT []
CMD node index.js
