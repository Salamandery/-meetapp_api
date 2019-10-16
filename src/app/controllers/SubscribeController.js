import { startOfHour, isBefore, format } from 'date-fns';
// Tradução
import { pt } from 'date-fns/locale/pt-BR';
// Sequelize options
import { Op } from 'sequelize';
// import * as Yup from 'yup';
// Modelo do usuário
import User from '../models/Users';
// Modelo do usuário
import File from '../models/Files';
// Modelo do usuário
import Event from '../models/Events';
// Modelo relacional de usuários e eventos para inscrição
import UserEvent from '../models/UserEvent';
// Fila de ações
import Queue from '../../lib/Queue';
// Mail
import Subscribe from '../../jobs/Subscribe';

class SubscribeController {
    async index(req, res) {
        // Verifica se o usuário é válido e existe
        const isUser = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        // Erro caso não seja ou não exista
        if (!isUser) {
            return res.status(401).json({ msg: 'Usuário inexistente.' });
        }
        // Verificação de data
        const Now = new Date();
        // Listagem de eventos
        const Events = await UserEvent.findAll({
            attributes: ['event_id'],
            where: {
                user_id: req.userId,
            },
            include: {
                model: Event,
                as: 'event',
                attributes: ['id', 'name', 'description', 'location', 'date'],
                where: {
                    date: { [Op.gte]: Now },
                },
                order: [['date', 'DESC']],
                include: [
                    {
                        model: File,
                        as: 'banner',
                        attributes: ['name', 'path', 'url'],
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email'],
                    },
                ],
            },
        });

        return res.json(Events);
    }

    async store(req, res) {
        // Variaveis da url
        const { id } = req.params;
        // Verifica se existe
        const event = await Event.findByPk(id);
        // Se o usuário criou gera erro
        if (!event) {
            return res.status(401).json({
                msg: 'Evento inexistente.',
            });
        }
        // Se usuario criou o evento
        const isUser = await Event.findOne({
            where: {
                id,
                user_id: req.userId,
            },
        });
        // Se o usuário criou gera erro
        if (isUser) {
            return res.status(401).json({
                msg: 'Não é possível se increver em um evento que você criou.',
            });
        }
        // Conversão de data
        const hourStart = startOfHour(event.date);
        // Verifica se a data já passou
        if (isBefore(hourStart, new Date())) {
            return res.status(401).json({ msg: 'Evento já foi realizado.' });
        }
        // Se já foi inscrito
        const Exists = await UserEvent.findOne({
            where: {
                user_id: req.userId,
                event_id: id,
            },
        });
        // Se já for inscrito gera erro
        if (Exists) {
            return res.status(401).json({
                msg: 'Você já foi inscrito nesse evento.',
            });
        }
        // Verifica disponibilidade de horário
        const sameHour = await UserEvent.findAll({
            where: {
                user_id: req.userId,
            },
            include: [
                {
                    model: Event,
                    as: 'event',
                    attributes: ['id', 'user_id'],
                    where: {
                        id: { [Op.ne]: id },
                        date: event.date,
                    },
                },
            ],
        });
        // Se registro for encontrado
        if (sameHour.length > 0) {
            return res.status(401).json({
                msg:
                    'Você não pode se inscrever em dois eventos com mesmo horário.',
            });
        }
        // Resultado da inserção
        const response = await UserEvent.create({
            user_id: req.userId,
            event_id: id,
        });
        // Dados do usuário
        const user = await User.findByPk(req.userId);

        // Formatando data para dia dd de mês às hh:mi
        const formattedDate = format(
            event.date,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );
        // Iniciando trabalho de envio de email para confirmação de cancelamento
        await Queue.add(Subscribe.key, {
            Exists: user,
            formattedDate,
            username: user.name,
        });

        return res.json(response);
    }

    async delete(req, res) {
        // Varivaves da url
        const { id } = req.params;
        // Verificando se existe agendamento
        const Exists = await Event.findByPk(id, {
            include: [
                { attributes: ['name', 'email'], model: User, as: 'user' },
            ],
        });
        // Se não for o criador do evento gera error
        if (!Exists) {
            return res.status(401).json({ msg: 'Evento inexistente' });
        }
        // Atualizando informações
        await UserEvent.destroy({
            where: {
                id,
                user_id: req.userId,
            },
        });

        return res.status(200).json();
    }
}

export default new SubscribeController();
