FROM node:24.12.0-alpine

WORKDIR /app

COPY docker/nextjs/*.sh /usr/local/bin/
COPY nextjs-app /app
RUN chmod +x /usr/local/bin/*.sh
EXPOSE 3000
