# Simple web Api

## Installation

* open a terminal and clone this repository

```console
git clone  https://github.com/avanhers/scrum_ticket.git avanhers_test
cd avanhers_test
```

* Create Images and run container

```console
docker-compose build
docker-compose up
```

The Server and mongoDB container are now running, you can check the log to see what happen

## Example of request to interact with api

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13787739-b62ad118-9e48-45b3-9ba1-70bcb5072406?action=collection%2Ffork&collection-url=entityId%3D13787739-b62ad118-9e48-45b3-9ba1-70bcb5072406%26entityType%3Dcollection%26workspaceId%3D42ea537e-0135-4d5b-8e51-62ac5fad979a)

## To have a look inside mongoDB databases

If you want to have access to mongodb databases in console mode

* First enter you container in console mode with this command

```console
docker exec -ti db_mongo bash
```

* Then launch mongo in your container by simply taping

```console
mongo
```

#
