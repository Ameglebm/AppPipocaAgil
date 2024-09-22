// Configuração principal do Express, carrega middlewares globais e rotas

const { connectDB } = require('./src/config/db');
const { getAllUsers, createUser } = require('./src/models/userModels');

async function runQueries() {
  try {
    await connectDB(); 

    const users = await getAllUsers();
    console.log('Usuários:', users);

    const newUser = await createUser('bia', 'teste', '12345678999', 'teste@teste.com', '123456');
    console.log('Novo usuário criado:', newUser);

  } catch (err) {
    console.error('Erro ao realizar consultas:', err);
  }
}

runQueries();


// instalar as dependencias do projeto
// npm install pg dotenv
