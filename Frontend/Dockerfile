FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite default port
EXPOSE 5173

# Run Vite dev server and expose it outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
