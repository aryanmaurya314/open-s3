FROM node:18.14-bullseye-slim

WORKDIR /

# Copy the rest of the application files
COPY . .

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Build the application
RUN yarn build

# Set the environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]
