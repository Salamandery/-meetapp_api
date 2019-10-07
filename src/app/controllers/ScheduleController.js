import { parseISO, endOfDay } from 'date-fns';
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

class ScheduleController {
    async index(req, res) {
        // Valores passado pela url
        const { page, date } = req.query;

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
        const data = endOfDay(parseISO(date));
        // Listagem de eventos
        const Events = await Event.findAll({
            attributes: [
                'name',
                'description',
                'date',
                'canceled_at',
                'successed_at',
            ],
            where: {
                user_id: req.userId,
                date: { [Op.lte]: data },
                [Op.or]: { successed_at: null, canceled_at: null },
            },
            limit: 20,
            offset: (page - 1) * 20,
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
        });

        return res.json(Events);
    }

    async store(req, res) {
        // Variaveis da url
        const { id } = req.params;
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
        // Verifica se o evento existe
        const isEvent = await Event.findOne({
            where: { id, canceled_at: null },
        });
        // Se evento não existir gera erro
        if (!isEvent) {
            return res.status(401).json({
                msg: 'Evento inexistente ou cancelado.',
            });
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
                        date: isEvent.dataValues.date,
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

        return res.json(response);
    }
}

export default new ScheduleController();
