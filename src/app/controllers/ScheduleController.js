import { parseISO, endOfDay, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
// Sequelize options
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
            attributes: ['id', 'name', 'date', 'location', 'description'],
            where: {
                date: { [Op.gte]: data },
            },
            limit: 10,
            offset: (page - 1) * 10,
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
        // Formatando data para dia dd de mês às hh:mi
        const eventsFormatted = Events.map(ev => ({
            id: ev.id,
            name: ev.name,
            description: ev.description,
            location: ev.location,
            user: ev.user,
            banner: ev.banner,
            date: ev.date,
            formattedDate: format(ev.date, "'Dia' dd 'de' MMMM', às' H:mm'h'", {
                locale: pt,
            }),
        }));

        return res.json(eventsFormatted);
    }
}

export default new ScheduleController();
