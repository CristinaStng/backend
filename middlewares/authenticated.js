const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res
      .status(403)
      .send({ msg: " La peticion no tiene la cabecera de autenticacion" });
  }

  const token = "Bearer" + req.headers.authorization;

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentData = new Date().getTime();

    // console.log(exp);
    // console.log(currentData);

    if (exp <= currentData) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = {
  asureAuth,
};
