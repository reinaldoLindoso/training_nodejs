const{
    readFile,
    writeFile
} = require('fs')

const{
    promisify
} = require('util')

// outra forma de obet dados do json
const dadosJson = require('./herois.json')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class DataBase{

    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true 
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        /**
         * {
         *  nome: flash,
         *  poder: velocidade
         * }
         * 
         * {
         *  id:123456
         * }
         * 
         * {
         * nome: flash,
         * poder: velocidade,
         * id: 123455 
         * }
         */

         const heroiComId = {
             id,
             ...heroi
         }
         
         const dadosFinal = [
             ...dados,
             heroiComId
         ]

         const resultado = await this.escreverArquivo(dadosFinal)

         return resultado
        }
    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item =>(id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([]) 
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        
        if(indice === -1){
            throw Error ('O heroi informado não existe')
        }

        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar (id, modificacoes){
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if(indice === -1){
            throw Error('O herói informado não existe!')
        }

        const atual = dados[indice]
        const objAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objAtualizar
        ])

    }


}

module.exports = new DataBase()