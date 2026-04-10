FROM node:18

# Install dependencies for running Jest in sandbox
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy all source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]