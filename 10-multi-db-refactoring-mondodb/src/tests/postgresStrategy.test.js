const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gaviao Negro', 
    poder:'flexas'
}
const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman', 
    poder:'Dinheiro'
}

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    this.beforeAll(async function(){
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSql Connection', async function(){
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('Cadastrar heroi', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Listar heroi', async function(){
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        // pegar a primeira posição 
        //const posicaoZero = result[0]
        //const [posicao1, posicao2] = ['esse e o 1', 'esse e o 2']
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Atualizar heroi', async function(){
        const [itemAtualizar] = await context.read({ nome:MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id})

        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)

        /*
            No js temos uma tecnica chamada rest/spread 
            que é um metodo usado para fazer 
            merge de objetos ou separa-los
            {
                nome: 'Batman',
                poder: 'Dinheiro'
            }
            {
                dataNascimento: '1999-10-10'
            }

            //final
             {
                nome: 'Batman',
                poder: 'Dinheiro',
                dataNascimento: '1999-10-10'
            }

        */
    })
    it('Remover heroi por ID', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })
})