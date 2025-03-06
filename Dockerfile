FROM ubuntu:latest
LABEL authors="kevinrenner"

ENTRYPOINT ["top", "-b"]