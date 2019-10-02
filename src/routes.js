import { Router } from 'express';
import multer from 'multer';
// Configuração do multer
import conf from './config/multer';
// Middleware authentication
import auth from './app/middlewares/auth';
// Controllers
// User
import UserController from './app/controllers/UserController';
// Session
import SessionController from './app/controllers/SessionController';
// File
import FileController from './app/controllers/FileController';
// Events
import EventsController from './app/controllers/EventController';

// Iniciando rotas
const routes = new Router();
// Iniciando gerenciador de arquivo
const upload = multer(conf);
// Rotas
// Definição de sessão
routes.post('/sessions', SessionController.store);
// Necessário autenticar antes de navegar abaixo
routes.use(auth);
// Cadastro de usuários
routes.post('/users', UserController.store);
// Cadastro e upload de imagem
routes.post('/files', upload.single('file'), FileController.store);
// Listagem de eventos
routes.get('/events', EventsController.index);
// Cadastro de eventos
routes.post('/events', EventsController.store);
// Atualização do cadastro do usuário
routes.put('/users', UserController.update);

module.exports = routes;
