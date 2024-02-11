FROM alpine:latest

RUN apk add --no-cache emacs-nox git bash
WORKDIR /app

COPY build.el /app/
RUN mkdir /app/public


CMD ["emacs", "-Q", "--script", "/app/build.el"]
RUN chmod -R +rw /app/public
