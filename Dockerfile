FROM node:18 as build

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.15.12-alpine  as production

COPY --from=build dist /usr/share/nginx/html
