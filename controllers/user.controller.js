async function getMet(req, res) {
    console.log(req.user)
        res.status(200).send({msg: "Ok"})
}

module.exports = {
    getMet
}