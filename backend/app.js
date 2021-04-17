const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

const Cliente = require('./models/cliente');

mongoose.connect('mongodb+srv://userteste123:teste12345@cluster0.afqan.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  next();
})

app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save();
  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido'});
});

app.get('/api/clientes', (req, res, next) => {
  Cliente.find()
  .then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  })
});

app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
});

app.delete('/api/clientes', (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
})

module.exports = app;
