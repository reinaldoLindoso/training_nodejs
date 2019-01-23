## ---- Para remover os containers (ativos ou inativos)
docker rm $(docker ps -aq)

docker run --name postgres -e POSTGRES_USER=reinaldolindoso -e POSTGRES_PASSWORD=postgres_pass123 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker ps
docker exec -it postgres /bin/bash

docker run --name adminer -p 8081:8080 --link postgres:postgres -d adminer 

# ----- MondoDB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mondodb_pass123 -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p mondodb_pass123 --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'reinaldolindoso', pwd: 'mondodb_pass123', roles:[{role:'readWrite', db:'herois'}]})"


docker start f4baa8a108d7

docker run -it -e DATAPOWER_ACCEPT_LICENSE=true -e DATAPOWER_INTERACTIVE=true -e DATAPOWER_WORKER_THREADS=4 -p 9090:9090 ibmcom/datapower
