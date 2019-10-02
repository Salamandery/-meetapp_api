import { Router } from 'express';

// Middleware authentication
import auth from './app/middlewares/auth';
// Controllers
// User
import UserController from './app/controllers/UserController';
// Session
import SessionController from './app/controllers/SessionController';

// Iniciando rotas
const routes = new Router();

// Rotas
// Definição de sessão
routes.post('/sessions', SessionController.store);
// Necessário autenticar antes de navegar abaixo
routes.use(auth);
// Cadastro de usuários
routes.post('/users', UserController.store);
// Atualização do cadastro do usuário
routes.put('/users', UserController.update);

module.exports = routes;
