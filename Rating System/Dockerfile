#ARG PORT
#ARG PORT

# WORKDIR /app
# COPY . .
# CMD ["npm", "install"]
# #CMD ["npm", "build"]
# CMD ["npm", "run", "start:dev"]



#FROM node:10-alpine
#WORKDIR /app
#COPY --from=builder /app ./
#EXPOSE $service_port
#CMD ["npm", "run", "start:prod"]

#RUN echo $service_port

FROM node:10 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5432
CMD ["npm", "run", "start:prod"]
