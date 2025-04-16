FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Expose the port React runs on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
