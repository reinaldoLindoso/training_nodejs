const assert = require('assert')
const Mondodb = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now}`,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

const context = new Context(new Mondodb())
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'conectado'
        console.log('Resultado', result)
        assert.deepEqual(result, expected)
    })

    it('Cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [{ nome,poder }] = await context.read({ nome:MOCK_HEROI_DEFAULT.nome })
        //const [{ nome,poder }] = await context.read({ nome:MOCK_HEROI_DEFAULT.nome })
        const resultado = {
            nome, poder
        }
        assert.deepEqual(resultado, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified, 1)
    })

    it('Excluir', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })

})