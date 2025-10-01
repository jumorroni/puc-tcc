# Start my image with a node
FROM node:alpine

# Create an application directory
# Set the /app directory
WORKDIR /user/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]