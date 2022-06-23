Comandos docker para iniciar os containers

Commands:

    - docker run
        --name postgres
        -e POSTGRES_USER=
        -e POSTGRES_PASSWORD=
        -e POSTGRES_DB=
        -p 5432:5432
        -d
        postgres

    - docker run
        --name adminer
        -p 8080:8080
        --link postgres:postgres
        -d
        adminer


    - docker run
        --name mongodb
        -p 27017:27017
        -e MONGO_INITDB_ROOT_USERNAME=
        -e MONGO_INITDB_ROOT_PASSWORD=
        -d
        mongo:4

    - docker run
        --name mongoclient
        -p 3000:3000
        --link mongodb:mongodb
        -d
        mongoclient/mongoclient

    - docker exec -it mongodb
        mongo --host  -u  -p  --authenticationDatabase
        --eval "db.getSiblingDB('').createUser({user: '', pwd: '', roles: [{role: 'readWrite', db: ''}]})"
