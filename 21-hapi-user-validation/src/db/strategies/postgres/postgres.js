const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud{
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected(){
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false;
        }
    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name, schema.schema, schema.options                        
        )
        await model.sync()
        return model
    }
        
    async create(item){
        const {
            dataValues
        } = await this._schema.create(item)

        return dataValues

       // return this._schema.create(item, {raw: item})
    }

    async update(id, item = {}, upsert = false){
        const fn = upsert ? 'upsert' : 'update'
        return this._schema[fn](item, { 
            where: {
                id
            }
        })
    }

    async read(item = {}){
        return this._schema.findAll({where: item, raw:true})
    }

    async delete(id){
        const query = id ? { id } : {}
        return this._schema.destroy({ where:query })
    }

    static async connect(){
        const connection = new Sequelize(
            'heroes',
            'reinaldolindoso',
            'postgres_pass123',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection
    }

}

module.exports = Postgres