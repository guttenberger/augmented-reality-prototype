FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl /etc/nginx/certs/
COPY www /usr/share/nginx/html/