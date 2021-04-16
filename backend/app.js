const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//   next();
// })

const clientes = [
  {
    id: '1',
    nome: 'Jose',
    fone: '11223344',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Maria',
    fone: '77889900',
    email: 'maria@email.com'
  },
  {
    id: '3',
    nome: 'Jaqueline',
    fone: '44774477',
    email: 'jaqueline@email.com'
  },
]

// app.use((req, res, next) => {
//   console.log ("Chegou uma requisição");
//   next();
// })

app.get('/api/clientes', (req, res) => {
  res.status(200).json(
    {
      mensagem: "Tudo OK",
      clientes: clientes
    }
  );
})

app.post('/api/clientes', (req, res) => {
  const cliente = req.body;
  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido'});
})

module.exports = app;
