# build image
FROM node:18-alpine as BUILD_IMAGE

# Create app directory
WORKDIR /app

# copy package.json and yarn.lock and intall dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# copy source code
COPY ./ ./

# build app
RUN yarn build

# production image
FROM node:18-alpine

# set node to production mode
ENV NODE_ENV production

# add default user
RUN addgroup -S app_user -g 1001
RUN adduser -S application -u 1001

# Create app directory
WORKDIR /app

# copy build files
COPY --from=BUILD_IMAGE --chown=application:app_user /app/.next ./.next
COPY --from=BUILD_IMAGE --chown=application:app_user /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=application:app_user /app/package.json ./package.json

# expose port
EXPOSE 3000

# start app
CMD ["yarn", "start"]