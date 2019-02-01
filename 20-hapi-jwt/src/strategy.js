class NotImplementedException extends Error{
    constructor(){
        super("Not Implemented Exception")
    }
}

class ICrud{
    create(item){
        throw new NotImplementedException()
    }

    read(query){
        throw new NotImplementedException()
    }

    update(id, item){
        throw new NotImplementedException()
    }

    delete(id){
        throw new NotImplementedException()
    }
}

class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("Item foi salvo no MongoDB")
    }
}

class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("Item foi salvo no Postgres")
    }
}



const contextMongo = new ContextStrategy(new MongoDB)
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres)
contextPostgres.create()