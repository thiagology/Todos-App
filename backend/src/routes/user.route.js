const express = require('express');

const UserController = require("../controllers/user.controller");

const Routes = express.Router();

// parametros são iguais (req, res), foram abstraidos do callback, passando só a assinatura das funções
// ":id" para variavel dinamica, é um params
Routes.get("/user/:id", UserController.getOne); 
Routes.delete("/user/:id", UserController.remove);
Routes.put("/user/:id", UserController.update);
Routes.get("/user", UserController.index);
Routes.post("/user", UserController.store);
Routes.post("/auth", UserController.auth);

module.exports = Routes;