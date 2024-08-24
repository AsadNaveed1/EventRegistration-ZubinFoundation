# How to setup Docker and prepare backend service

- Prepare Docker Desktop and Docker.

- `docker pull postgres` to get the latest postgres image.

- `cd server` to go to server directory.

- Simply type `docker compose up -d --build` to create images and run its services (both backend and db) in a docker container.

- After that, go to your Docker Desktop and check if all services are running (if not, that means some error(s) happened and the service(s) crashed, mainly due to some changes in the code). If you are okay, then it means the services are working properly as intended.

# Check postgres DB table in a Docker container

If you want to see the postgresql table, please follow this instructions:

- `docker-compose exec db psql -U postgres -d postgres-db` – for connecting to the postgres cli (fit into our DB configuration)

- `\dt` – see the tables in database

- `SELECT * FROM table_name;` – sql query to see the data inside the table you want to see (e.g. user_user)

- `INSERT INTO user_user (username, password, user_type, email) VALUES ('admin', 1234, 'admin', 'admin@gmail.com');` - insert admin manually

- `\q` – quit the cli
