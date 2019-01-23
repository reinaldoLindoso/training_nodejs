const assert = require('assert')
const api = require('./../api')

describe('Suite de testes da API Heroes', function(){

    this.beforeAll( async () =>{
        app = await api
    })

    it('Retorno 200 com sucesso', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
    })

    it('Lista de herois /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        assert.ok(Array.isArray(dados))
    })
})