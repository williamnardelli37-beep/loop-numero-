FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY app/templates/ /usr/share/nginx/html/
COPY app/static/ /usr/share/nginx/html/static/

EXPOSE 80