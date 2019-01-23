const ICrud = require('./interfaces/interfaceCrud')

class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("Item foi salvo no MongoDB")
    }
}

module.exports = MongoDB