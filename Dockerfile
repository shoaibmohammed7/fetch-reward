FROM node:20-slim


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY tsconfig.json ./
COPY src/ ./src/


RUN npm run build


EXPOSE 3000


CMD ["node", "dist/app.js"]