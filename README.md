# Awesome Project Build with TypeORM

## Steps to run this project:

1. Run `npm install` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run migration:run` command
4. Run `npm build` command
5. Run `npm start` command

## curl

---
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin",
    "password": "admin"
}'

---
curl --location --request POST 'http://localhost:3000/auth/change-password' \
--header 'auth: ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "oldPassword": "admin",
    "newPassword": "admin2"
}'

---
curl --location --request GET 'http://localhost:3000/user' \
--header 'auth: '

---
curl --location --request POST 'http://localhost:3000/user' \
--header 'auth: ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user",
    "password": "user",
    "type": "user"
}'

---
curl --location --request GET 'http://localhost:3000/user/2' \
--header 'auth: '

---
curl --location --request PATCH 'http://localhost:3000/user/2' \
--header 'auth: ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user2",
    "type": "user"
}'

---
curl --location --request DELETE 'http://localhost:3000/user/2' \
--header 'auth: '