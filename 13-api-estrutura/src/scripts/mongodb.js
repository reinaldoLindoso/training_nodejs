//para visualizar qual ID da imagem do mongo
//docker ps
//para conectar no mongodb via terminal 
//docker exec -it 41c107b7facc mongo -u reinaldolindoso -p mondodb_pass123 --authenticationDatabase herois
//mostra todos os bancos que podemos usar - databases
//show dbs
// mudando o contexto para uma database especifica
//use herois
// para visualizar as "tabelas" = coleções de documentos
//show collections

db.herois.insert({nome: 'Flash',poder: 'Velocidade',dataNascimento: '1998-01-01'})
db.herois.find()
db.herois.find().pretty()
db.herois.count()
db.herois.findOne()
db.herois.find().limit(10).sort({nome: -1})

for(let i=0; i<= 1000; i ++ ){
    db.herois.insert({
        nome: `Clone-${i}`, 
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

// create
db.herois.insert({nome: 'Flash',poder: 'Velocidade',dataNascimento: '1998-01-01'})

//read
db.herois.find()
db.herois.find({nome:'Mulher maravilha'})
db.herois.find().limit(10).sort({nome: -1})
db.herois.find({_id:ObjectId("5c40f0fb4dde2e863e44de08") })
db.herois.findOne({_id:ObjectId("5c40f460d75f06b2f08ca0a5") })

//update
db.herois.update( {_id:ObjectId("5c40f0fb4dde2e863e44de08") }, 
                  {nome: 'Mulher maravilha'})

//update somente do nome
db.herois.update( {_id:ObjectId("5c40f460d75f06b2f08ca0a5") }, 
                  { $set: {nome: 'Lanterna Verde'} })

//update pelo poder, ele faz somente no primeiro encontrado
db.herois.update( { poder: 'Velocidade' }, 
                  { $set: {poder: 'super força'} })

//delete 
db.herois.remove({}) // remove todos
db.herois.remove({nome: 'Mulher maravilha'})