const bcrypt = require("bcrypt"); // encript de senha
const jwt = require('jsonwebtoken'); // autenticação por token

const UserModel = require("../models/user.model");

const saltRounds = 10; // gera o prefixo do hash

//função para encripitar
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds); // gera um salto em cima dos rounds
  const encryptPassword = await bcrypt.hash(password, salt); // faz o hash da senha

  return encryptPassword;
};

// As funções do UserModel.algo são do mongoose
class User {
  async index(req, res) {
    const users = await UserModel.find();

    res.send({ data: users }); // devolve como um objeto
  }

  // rota de criação
  async store(req, res) {
    const body = req.body;

    if (body.password) { // se tiver senha
      body.password = await hashPassword(body.password); // chama a função de hash criada
    }

    const user = await UserModel.create(body);

    res.send({ data: user });
  }

    // acha user por id
  async getOne(req, res) {
    const { id } = req.params; // recupera o id da requisição

    try {
      const user = await UserModel.findById(id);
      res.send({ data: user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // rota de remoçao
  async remove(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return res.send({ message: "User not exist" });
      }

      await user.remove();

      res.send({ message: "User removed" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  // rota de atualização
  async update(req, res) {
    const {
      body,
      params: { id },
    } = req;

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    const user = await UserModel.findByIdAndUpdate(id, body, { new: true });

    res.send({ data: user });
  }

  // rota de autenticação
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email }).lean(); // procura um objeto como pleno, retorna so os dados

      if (!user) {
        throw new Error("User not exists");
      }

      const isValid = await bcrypt.compare(password, user.password); // comparando as senhas

      if (!isValid) {
        throw new Error("Password invalid");
      }

      const token = jwt.sign(user, process.env.JWT_SECRET) // gerando um token

      res.send({ token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new User();
