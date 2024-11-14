FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create environment files for both development and production
RUN echo "REACT_APP_API_URL=http://localhost:5000" > .env.development && \
    echo "REACT_APP_API_URL=http://103.253.20.13:5000" > .env.production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 