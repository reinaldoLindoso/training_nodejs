const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(params) {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "Id do heroi")

        .option('-c, --cadastrar', "Cadastra um heroi")
        .option('-l, --listar', "Lista um heroi")
        .option('-l, --remover', "Remove um heroi pelo ID")
        .option('-a, --atualizar [value]', "Atualiza um heroi pelo ID")
        .parse(process.argv)

    const heroi = new Heroi(Commander)
    
    try {
        if(Commander.cadastrar){
            //console.log(heroi)
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado!')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }
        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possível remover o herói!')
            }
            console.log('Herói removido com sucesso!')
        }
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar);
            //remover todas as chaves que estiverem com undefinied ou null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado){
                console.error('Não foi possível atualizar o heroi!')
                return;
            }
            console.log('Heroi atualizado com sucesso!')

        }
    } catch (error) {
        console.error('Deu erro na execução:', error)
    }
}

main()