const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let produtos = [];

app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  produtos.push(novoProduto);
  res.status(201).send({
    mensagem: 'Produto cadastrado com sucesso!',
    produto: novoProduto
  });
});

app.get('/produtos', (req, res) => {
    res.send(produtos);
  });

app.put('/estoque/entrada', (req, res) => {
    const { nome, quantidade } = req.body; 
  
    const produto = produtos.find(p => p.nome === nome);
  
    if (!produto) {
      return res.status(404).send({ mensagem: 'Produto não encontrado!' });
    }
  
    produto.quantidade += quantidade;
  
    res.send({
      mensagem: 'Entrada registrada com sucesso!',
      produto
    });
  });

app.put('/estoque/saida', (req, res) => {
    const { nome, quantidade } = req.body; 
    const produto = produtos.find(p => p.nome === nome);

    if (!produto) {
      return res.status(404).send({ mensagem: 'Produto não encontrado!' });
    }
  
    if (produto.quantidade < quantidade) {
      return res.status(400).send({ mensagem: 'Estoque insuficiente!' });
    }
  
    produto.quantidade -= quantidade;
  
    res.send({
      mensagem: 'Saída registrada com sucesso!',
      produto
    });
  });

app.get('/', (req, res) => {
    res.send('API de Controle de Estoque funcionando!');
  });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
