import { parseISO, endOfDay } from 'date-fns';
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
        const Events = await UserEvent.findAll({
            attributes: ['event_id'],
            where: {
                user_id: req.userId,
            },
            limit: 10,
            offset: (page - 1) * 10,
            include: {
                model: Event,
                as: 'event',
                attributes: ['id', 'name', 'description', 'location', 'date'],
                where: {
                    date: { [Op.lte]: data },
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
}

export default new ScheduleController();
