import { Op } from 'sequelize';
// import * as Yup from 'yup';
// Modelo do usuário
import User from '../models/Users';
// Modelo do usuário
import File from '../models/Files';
// Modelo do usuário
import Event from '../models/Events';

class ScheduleController {
    async index(req, res) {
        // Valores passado pela url
        const { page } = req.query;
        // Verifica se o usuário é provedor e existe
        const isProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });
        // Erro caso não seja ou não exista
        if (!isProvider) {
            return res.status(401).json({ msg: 'Provedor inexistente.' });
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
                provider_id: req.userId,
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
                    as: 'provider',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        return res.json(Events);
    }
}

export default new ScheduleController();
