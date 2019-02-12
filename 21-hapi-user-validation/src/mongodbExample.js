
const Mongoose = require('mongoose');
//const mongoose = require('mongoose');
//npm WARN 07-multi-db@1.0.0 No repository field.
Mongoose.connect('mongodb://reinaldolindoso:mondodb_pass123@localhost:27017/herois', 
    { useNewUrlParser: true}, function (error){
        if(!error) return ;
        console.log('Falha na conexão', error)
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!!'))

// setTimeout(()=>{
//     const state = connection.readyState
//     console.log('state', state)
// }, 1000)
/*
    Estados de conexão:
    0:disconectado
    1:conectado
    2:conectando
    3:disconectando
*/

// Exemplos de criação de função
// function nomeFuncao(){
// }
// const minhaFuncao = function (){
// }
// const minhaFuncaoArrow = (params) => console.log(params)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    dataInsercao: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('Result cadastrar', resultCadastrar)

    const listarItens = await model.find()
    console.log('Itens', listarItens)
}

main()