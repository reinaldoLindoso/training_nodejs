const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
//npm i jsonwebtoken
const JWT = require('jsonwebtoken')
const PasswordHelper = require('./../helpers/passwordHelper')

const failAction = (request, headers, erro) => {
    throw erro;
}

const USER = {
    username: 'Xuxadasilva',
    password: '123'
}

class AuthRoutes extends BaseRoute {

    constructor(secret, db){
        super()
        this.secret = secret
        this.db = db
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
                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                })
                if(!usuario){
                    return Boom.unauthorized('O usuario informado nao existe!')
                }
                const match = await PasswordHelper
                                        .comparePassword(password, usuario.password)
                if(!match){
                    return Boom.unauthorized('Usuario ou senha invalida !')
                }

                // if (
                //     username.toLowerCase() !== USER.username ||
                //     password !== USER.password
                // )
                //     return Boom.unauthorized()
                
                const token = JWT.sign({
                    username: username,
                    id: usuario.id
                }, this.secret )//'MINHA_CHAVE_SECRETA'

                return{
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes