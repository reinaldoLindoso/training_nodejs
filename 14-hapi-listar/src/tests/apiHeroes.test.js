const assert = require('assert')
const api = require('./../api')

describe('Suite de testes da API Heroes', function(){

    this.beforeAll( async () =>{
        app = await api
    })

    it('Lista de herois /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=1000'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Lista /herois deve retornar somente 3 registros', async () =>{
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Lista /herois - Deve retornar erro com limit incorreto', async () =>{
        const TAMANHO_LIMITE = 'AEEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        
        assert.equal(result.payload, 'Erro interno no servidor')
    })

    it('Lista /herois deve filtrar um item', async () =>{
        const NAME = 'Batman'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

})