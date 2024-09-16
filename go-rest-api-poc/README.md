# Go REST API


## Install PostgreSQL

installation:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

## Init database

run postgres:
```bash
sudo service postgresql start
sudo -u postgres psql
```

check your `./.env` file and replace:
- `<myuser>` with `DB_USER`
- `<mydb>` with `DB_NAME`
- `<mypassword>` with `DB_PASSWORD`

```sql
CREATE USER <myuser> WITH PASSWORD '<mypassword>';
CREATE DATABASE <mydb>;
GRANT ALL PRIVILEGES ON DATABASE <mydb> TO <myuser>;
```

## Run the REST API
```bash
go run .
```

## Useful

### PostgreSQL commands 

connect to chess db with psql:
```bash
sudo -u postgres psql -d <mydb>
```

\l                  show dbs
\c <dbname>         choose a db
\exit               exit
\conninfo           get connexion info
\password <dbname>  change db pw
\dt                 show tables

### SQL queries

```sql
SELECT * FROM users;  -- show all rows in users table
INSERT INTO users (email, password) VALUES ('test@test.com', 'super-pw');
```
