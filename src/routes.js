const express = require('express')
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")

/*Variaveis do sistema */

/* Rotas */
routes.get('/', DashboardController.index)
routes.get('/index',(req,res) => res.redirect("/"))
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id',JobController.show)
routes.post('/job/:id',JobController.update)
routes.post('/job/delete/:id',JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes