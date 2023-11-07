const express = require("express")
const Authcontroller = require("../controllers/auth.controller")

const api = express.Router()

api.post("/auth/register/", Authcontroller.register)
api.post("/auth/login/", Authcontroller.login)
api.post("/auth/refresh_access_token/", Authcontroller.refreshAccessToken)

module.exports = api