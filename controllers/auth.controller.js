const bcrypt = require("bcryptjs")
const User = require("../models/user.model") 
const jwt = require("../utils/jwt")


function register(req, res){
    
    const{firstname, lastname, email, password}= req.body

    if (!email)res.status(400).send({msg:"el email es obligatorio"})
    if (!password)res.status(400).send({msg:"la contraseña es obligatoria"})
    const user = new User({
        firstname,
        lastname,
        email:email.toLowerCase(),
        role:"user",
        active:false
        })

        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password,salt)
     
        user.password = hashpassword
        user.save((error, userStorage) => {
            if (error) {
                res.status(400).send({msg: "Error al crear el usuario"})
            } else {
                res.status(200).send(userStorage)
            }
        })
}

function login(req, res) {
    const {email, password} = req.body
    if (!email)res.status(400).send({msg:"el email es obligatorio"})
    if (!password)res.status(400).send({msg:"la contraseña es obligatoria"})
   
    
    const emailLowercase = email.toLowerCase()
    User.findOne({ email: emailLowercase},(error, userStore) =>{
        if(error){
            res.status(500).send({msg:"Error del servidor"})
        }else {
            bcrypt.compare( password, userStore.password, (bcryptError, check) =>{
            if (bcryptError) {
                res.status(500).send({msg:"Error del servidor"})
            } else if (!check){
                res.status(400).send({msg:"Usuario o Contraseña incorrecta"})
            } else if (userStore.active){
                res.status(401).send({msg:"Usuario no Autorizado o no Activo"})
            } else {
                res.status(200).send({
                    access:jwt.createAccesstoken(userStore),
                    refresh:jwt.createRefreshToken(userStore)
                })
            }
            })
             //res.status(200).send(userStore)
        }
    })
}

function refreshAccessToken(req, res){
    const {token } = req.body
    if(!token)res.status(400).send({msg: "Error token requerido"})
    const {user_id} = jwt.decoded(token)

    User.findOne({_id: user_id},(error, userStorage) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"})   
        } else {
            res.status(200).send({
                accessToken:jwt.createAccesstoken(userStorage)
            }) 
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}