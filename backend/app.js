require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const clienteRoutes = require ('./rotas/clientes');

app.use(cors());
app.use(express.json());

const Cliente = require('./models/cliente');
const user_db = process.env.MONGODB_USER;
const pass_db = process.env.MONGODB_PASSWORD;
const cluster_db = process.env.MONGODB_CLUSTER;
const name_db = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb+srv://${user_db}:${pass_db}@${cluster_db}.afqan.mongodb.net/${name_db}?retryWrites=true&w=majority`)
.then(() => {
  console.log("Conexão OK");
}).catch(() => {
  console.log("Conexão NOK");
})


const clientes = [
  {
    id: '1',
    nome: 'José',
    fone: '11223344',
    email: 'jose@email.com'
  },
  {
    id: 2,
    nome: 'Jaqueline',
    fone: '22112211',
    email: 'jaqueline@email.com'
  }
]

app.use('/api/clientes', clienteRoutes);


module.exports = app;
