# Database
linux-u db-u same pw 2000

## PostgreSQL commands

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
