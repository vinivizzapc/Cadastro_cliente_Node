const express = require ("express");
const router = express.Router();
const Cliente = require('../models/cliente');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  next();
})

router.post('', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
    cliente.save().then((clienteInserido) => {
      console.log(cliente);
    res.status(201).json({
      mensagem: 'Cliente inserido',
      id: clienteInserido._id
    });
  });
});

router.get('', (req, res, next) => {
  Cliente.find()
  .then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Cliente.findById(req.params.id).then(cli => {
    if (cli){
     res.status(200).json(cli);
  }
    else
      res.status(404).json({mensagem: "Cliente não encontrado!"})
    })
  });

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Cliente.deleteOne({_id: req.params.id}).then(resultado => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Cliente removido"
    })
  })
})

router.put('/:id', (req, res, next) => {
  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  Cliente.updateOne({_id: req.params.id}, cliente)
  .then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({mensagem: 'Atualização realizada com sucesso'});
})

module.exports = router;
