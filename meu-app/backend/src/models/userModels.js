// Define a estrutura dos dados, representando as tabelas do banco de dados (gerenciado por Prisma)

const { client } = require('../config/db');

async function getAllUsers() {
  const res = await client.query('SELECT * FROM cadastro');
  return res.rows;
}

// Função para criar um novo usuário
async function createUser(nome, sobrenome, cpf, email, senha) {
  const res = await client.query(
    'INSERT INTO cadastro (nome, sobrenome, cpf, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, sobrenome, cpf, email, senha]
  );
  return res.rows[0];
}

module.exports = { getAllUsers, createUser };
