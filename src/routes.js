const express = require('express')
const routes = express.Router()

const basePath = __dirname + "/views/"

const profile = {
    "name":"Ricardo Nunes",
    "avatar":"https://github.com/ricardonun.png",
    "monthly-budget":2400,
    "hours-per-day":7,
    "days-per-week":5,
    "vacation-per-year":4
}
const jobs = [] 
routes.get('/',(req,res) => res.render(basePath + "index",{profile}))
routes.get('/index',(req,res) => res.redirect("/"))
routes.get('/job',(req,res) => res.render(basePath + "job"))
routes.post('/job',(req,res) => {
    jobs.push(req.body)
    return res.redirect("/")
})
routes.get('/job/edit',(req,res) => res.render(basePath + "job-edit"))
routes.get('/profile',(req,res) => res.render(basePath + "profile", { profile }))

module.exports = routes