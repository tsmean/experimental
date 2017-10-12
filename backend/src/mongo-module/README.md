# MongoDB Module

This is a database layer for a MongoDB written in TypeScript.

The `MongoConnector` is responsible for setting up a connection with
the database. This could either be a remote or a local mongo instance.

The `MongoDAO` is the Database-Access-Object. It provides CRUD
(create-read-update-delete) access methods.

The `mongo.module.ts` is a file related to the NEST framework.
It straps together the components and exports the ones necessary for
other modules (i.e. the public API).
