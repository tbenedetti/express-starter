FROM node:16.14.2-alpine3.14

# Create app directory
WORKDIR /app

# Pre-Build
COPY package*.json ./

# Build
RUN npm ci --only=production && npm cache clean --force

# Post-Build
COPY . .


ENV NODE_ENV production

CMD ["node", "src/index.js"]