const express = require("express")
const UserController = require("../controllers/user.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.get("/user/me", [md_auth.asureAuth], UserController.getMet)

module.exports = api