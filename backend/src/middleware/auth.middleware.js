const jwt = require("jsonwebtoken");

const publicPaths = ["/", "/api/auth"];

const authMiddleware = (req, res, next) => {
  const {
    headers: { authorization }, // cabeçalho contendo o token de autorização
    url,
    method,
  } = req;

  if (publicPaths.includes(url) || (url === "/api/user" && method === "POST")) {
    return next();
  }

  try {
    if (!authorization) {
      throw new Error("Authorization not exists");
    }

    const [, token] = authorization.split(" "); // quebra a string e pega só o que tem depois do baerer
    const user = jwt.verify(token, process.env.JWT_SECRET); // valida o token

    req.headers.loggedUser = user;

    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = authMiddleware;
