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
// Agendamento
import ScheduleController from './app/controllers/ScheduleController';
// Inscrições
import SubscribeController from './app/controllers/SubscribeController';

// Iniciando rotas
const routes = new Router();
// Iniciando gerenciador de arquivo
const upload = multer(conf);
// Rotas
// Definição de sessão
routes.post('/sessions', SessionController.store);
// Cadastro de usuários
routes.post('/users', UserController.store);
// Necessário autenticar antes de navegar abaixo
routes.use(auth);
// Listagem de usuários
routes.get('/users', UserController.index);
// Listagem de eventos
routes.get('/events', EventsController.index);
// Listagem de eventos por data
routes.get('/schedules', ScheduleController.index);
// Lista de inscrição
routes.get('/subscribe/', SubscribeController.index);
// Cadastro e upload de imagem
routes.post('/files', upload.single('file'), FileController.store);
// Cadastro de eventos
routes.post('/events', EventsController.store);
// Cadastro de inscrição
routes.post('/subscribe/:id', SubscribeController.store);
// Atualização do cadastro do usuário
routes.put('/users', UserController.update);
// Atualização do cadastro de eventos
routes.put('/events', EventsController.update);
// Deletando o cadastro de eventos
routes.delete('/events/:id', EventsController.delete);
// Deletando a inscrição
routes.delete('/subscribe/:id', SubscribeController.delete);

module.exports = routes;
