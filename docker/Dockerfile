FROM python:3.8-slim

ENV DEBIAN_FRONTEND noninteractive

ENV PYTHONUNBUFFERED 1
ENV PIP_DISABLE_PIP_VERSION_CHECK 1

# Cài code API
RUN mkdir -p /code/api
RUN mkdir /log

RUN #pip install gunicorn futures

COPY src/be_eng/requirements.txt /code/api/
RUN pip install -r /code/api/requirements.txt

COPY src/be_eng/src/ /code/api/

WORKDIR /code/api

COPY docker/entrypoint-api.sh /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
CMD []
