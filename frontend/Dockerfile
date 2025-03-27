FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Make sure Vite binds to 0.0.0.0 so it's accessible from outside the container
ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=5173

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 