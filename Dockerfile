FROM node:16 as build

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.23.2-alpine  as production

COPY --from=build dist /usr/share/nginx/html
