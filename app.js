const express = require("express")
const bodyParser = require("body-parser")
const Cors = require("cors")
const {API_VERSION} = require("./constants")

const app = express()

//implementar rutas
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")

//configurar body parse

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//configurar carpeta estatica
app.use(express.static("uploads"))

//configurar header http - cors
app.use(Cors())

//configurar rutas
app.use(`/api/${API_VERSION}`,authRoutes)
app.use(`/api/${API_VERSION}`,userRoutes)


module.exports = app