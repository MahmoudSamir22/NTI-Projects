//load configuration file .env
require('dotenv').config()
//call required installed pacakages
const express = require("express")
const validator = require("validator")
const hbs = require("hbs")
//call required built-in packages
const path = require("path")
//create express instance
const app = express()
app.use(express.urlencoded({extended:true}))
//use views, partials, statics
app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "../public")))
app.set('views', path.join(__dirname, "../front/views"))
hbs.registerPartials(path.join(__dirname, "../front/layouts"))
//using routes
const userRoutes = require('../routes/user.routes')
app.use(userRoutes)
app.get('*', (req,res)=>{
    res.render('err404', {PageTitle: "error page", err:"page Not Found"})
})
//export all app
module.exports=app