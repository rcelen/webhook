FROM node:alpine
WORKDIR /app
COPY . .
RUN rm -rf node_modules && rm -rf .github
RUN npm i
EXPOSE 80
CMD [ "node", "webhook.js" ]
