const express = require("express"); //rotas e views
const cors = require('cors');
const mongoose = require("mongoose"); //ORN de Bancos não relacionais
const morgan = require('morgan'); // fazer logs de requisições

require('dotenv').config() // dotenv para o back acessar variaveis de ambiente

const Routes = require('./routes');
const authMiddleware = require('./middleware/auth.middleware');

const {MONGO_URL, HTTP_PORT} = process.env; //variaveis de ambiente

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(morgan("dev"));

app.use(Routes);

app.get("/", (request, response) => {
  response.send({ message: "Hello World" });
});

app.listen(HTTP_PORT, () => {
  console.log(`Rodando na porta ${HTTP_PORT}`);
});
