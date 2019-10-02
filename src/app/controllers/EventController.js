import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
// Modelos
// Usuário
import User from '../models/Users';
// Usuário
import File from '../models/Files';
// Eventos
import Event from '../models/Events';
// Arquivos
// import files from '../models/Files';

class EventController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const event = await Event.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        return res.json(event);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required(),
        });
        // Gera erro se campo não for válido
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        // Relacionamento e filtros
        const { provider_id, date } = req.body;
        // Verifica se o usuário é provedor e existe
        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });
        // Erro caso não seja ou não exista
        if (!isProvider) {
            return res.status(401).json({ msg: 'Provedor inexistente.' });
        }
        // Conversão de data
        const hourStart = startOfHour(parseISO(date));
        // Verifica se a data já passou
        if (isBefore(hourStart, new Date())) {
            return res.status(401).json({ msg: 'Data não permitida.' });
        }
        // Verifica disponibilidade
        const checkHour = await Event.findOne({
            where: { provider_id, canceled_at: null, date: hourStart },
        });
        // Se já existir gera erro
        if (checkHour) {
            return res
                .status(401)
                .json({ msg: 'Horário não é válido para cadastro.' });
        }
        // Cria evento se tudo ok
        const Events = await Event.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        return res.json(Events);
    }
}

export default new EventController();
