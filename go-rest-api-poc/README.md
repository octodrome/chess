# Database
linux-u db-u same pw 2000
useful link: https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart

## PostgreSQL commands 

connect to chess db with psql:
```bash
sudo -u chess psql
```

\l                  show dbs
\c <dbname>         choose a db
\exit               exit
\conninfo           get connexion info
\password <dbname>  change db pw
\dt                 show tables

## SQL useful queries

```sql
    SELECT * FROM users;  -- show all rows in users table
    INSERT INTO users (email, password) VALUES ('test@test.com', 'super-pw');
```
