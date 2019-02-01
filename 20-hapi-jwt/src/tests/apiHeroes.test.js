const assert = require('assert')
const api = require('./../api')
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta bionica'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Gaviao negro',
    poder: 'A Mira'
}
let MOCK_ID = ''
describe('Suite de testes da API Heroes', function () {

    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
       
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id

    })

    it('Lista de herois /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=1000'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Lista /herois deve retornar somente 3 registros', async () => {
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

    it('Lista /herois - Deve retornar erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = { "statusCode": 400, "error": "Bad Request", "message": "child \"limit\" fails because [\"limit\" must be a number]", "validation": { "source": "query", "keys": ["limit"] } }
        assert.deepEqual(result.statusCode, 400)
        assert.equal(result.payload, JSON.stringify(errorResult))
    })

    it('Lista GET /herois deve filtrar um item', async () => {
        const NAME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('Cadastrar POST /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode
        const { 
            message, 
            _id 
        } = JSON.parse(result.payload)
        
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, 'Heroi cadastrado com sucesso')
    })

    it('Atualizar PATCH /herois/:id', async () =>{
        const _id = MOCK_ID
        const expected = {
            poder: 'Super mira'
        }
        
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso')
    })

    it('Atualizar PATCH /herois/:id - não deve atualizar com ID incorreto!', async () =>{
        const _id = `5c47847f1d87b59589e7edb5`     
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({
                poder: 'Super mira'
            })
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco!'
        }
        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /herois/:id', async () =>{
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!')
    })

    it('Remover DELETE - /herois/:id não deve remover', async () =>{
        const _id = '5c47847f1d87b59589e7edb5'
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco!'
        }
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /herois/:id não deve remover ID INVALIDO', async () =>{
        const _id = 'ID_INVALIDO'
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expected)
    })
})