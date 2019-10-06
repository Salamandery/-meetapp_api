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
        const { page } = req.query;
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
                canceled_at: null,
                [Op.or]: { successed_at: null },
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

        if (isUser) {
            return res.status(401).json({
                msg: 'Não é possível se increver em um evento que você criou.',
            });
        }
        // Se já foi inscrito
        const Exists = await UserEvent.findOne({
            where: {
                user_id: req.userId,
                event_id: id,
            },
        });

        if (Exists) {
            return res.status(401).json({
                msg: 'Você já foi inscrito nesse evento.',
            });
        }

        const response = await UserEvent.create({
            user_id: req.userId,
            event_id: id,
        });

        return res.json(response);
    }
}

export default new ScheduleController();
