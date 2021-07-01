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

For every Request except Adding a User , Credential(Access token) will be needed , you will have to copy it (from Auth request response) and copy it in Authorization field in Header.

For Request specific to ticket here are the following credentials:
* only a Scrum Master(sm role) can create a ticket
* only a product owner (po) can delete a ticket
* Scrum Master and Product Owner can update a ticket
* everyone can search for a ticket

To Update or Delete a ticket you will need is reference(mongo \_id) and add it inside the request's body

## To have a look inside mongoDB databases

If you want to have access to mongodb databases in console mode, 

* Open a new terminal and type this

```console
docker exec -ti db_mongo bash
```

* Then launch mongo in your container 

```console
mongo
```

* Then find all ticket

```console
use tickets
db.tickets.find()
```

## License
Nest is MIT License
