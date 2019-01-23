const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port:5000
})

function mapRoutes(instance, methods){
    //new HeroRoutes().list() é igual à new HeroRoutes()['list']()
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ])

    return app
}

module.exports = main()