## -- Webservice usando Hapi.js e Joi.js

## -- Remove pasta node_modules via powershell
remove-item -path .\node_modules\

## -- Inicialia projeto
npm i

## -- Instalando o Joi
npm i joi

## -- Roda testes unitários
npm t

http://localhost:5000/herois?skip=2&limit=10&nome=flash