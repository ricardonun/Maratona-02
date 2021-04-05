const { json } = require('express');
const express = require('express');
const server = express();
const routes = require('./routes')
const path = require('path')

// Setando o template para ejs
server.set("view engine", 'ejs')

//Mudar local do views
server.set('views', path.join(__dirname, 'views'))

//Importando arquivos estaticos
server.use(express.static("public"))

//Liberar o req.body
server.use(express.urlencoded({ extended: true }))

//Iniciando Rotas
server.use(routes)

//Iniciando Servidor na porta 3000
server.listen(3000, () => console.log("rodando"))