const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
//npm i jsonwebtoken
const JWT = require('jsonwebtoken')

const failAction = (request, headers, erro) => {
    throw erro;
}

const USER = {
    username: 'xuxadasilva',
    password: '1234'
}

class AuthRoutes extends BaseRoute {

    constructor(secret){
        super()
        this.secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com user e password do banco',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload

                if (
                    username.toLowerCase() !== USER.username ||
                    password !== USER.password
                )
                    return Boom.unauthorized()
                
                const token = JWT.sign({
                    username: username,
                    id: 1
                }, this.secret )//'MINHA_CHAVE_SECRETA'

                return{
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes