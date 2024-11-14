# Development stage
FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create environment files
RUN echo "REACT_APP_API_URL=http://localhost:5000" > .env.development

EXPOSE 3000

CMD ["npm", "start"]

# Production stage
FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Create production env file
RUN echo "REACT_APP_API_URL=http://103.253.20.13:5000" > .env.production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 