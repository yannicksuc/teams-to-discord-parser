# Implementing OAuth 2.0 in Node.js

This is the source code for my article on [Implementing OAuth 2.0 in Node.js](https://blog.logrocket.com/implementing-oauth-2-0-in-node-js/).

Before running the app, you have to set up the Postgres database. For this, install Postgres and create a new database called `logrocket_oauth2`.

Then, run this script to create the tables:

```sql
CREATE TABLE public.users
(
    id serial,
    username text,
    user_password text,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.users
    OWNER to postgres;



CREATE TABLE public.access_tokens
(
    id serial,
    access_token text,
    user_id integer,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.access_tokens
    OWNER to postgres;
```

After that, run the command to install the npm dependencies:

```
npm install
```

And finally:

```
node index.js
```

The app will start at http://localhost:3000.
