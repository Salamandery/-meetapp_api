import * as Yup from 'yup';
// Tratamento de datas
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
// Tradução
import pt from 'date-fns/locale/pt-BR';
// Modelos
// Usuário
import User from '../models/Users';
// Usuário
import File from '../models/Files';
// Eventos
import Event from '../models/Events';
// Schema
// Notificação
import Notification from '../schema/Notifications';

class EventController {
    async index(req, res) {
        // Paginação enviada pela url
        const { page = 1 } = req.query;
        // Listagem com limite de paginação * 20
        const event = await Event.findAll({
            where: { user_id: req.userId },
            order: ['date'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'date', 'name', 'location', 'description'],
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
        const eventsFormatted = event.map(ev => ({
            id: ev.id,
            name: ev.name,
            description: ev.description,
            location: ev.location,
            user: ev.user,
            banner: ev.banner,
            date: format(ev.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
                locale: pt,
            }),
        }));

        return res.json(eventsFormatted);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            name: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            banner_id: Yup.number().required(),
        });
        // Gera erro se campo não for válido
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        // Relacionamento e filtros
        const { date, name, description, location, banner_id } = req.body;

        // Verifica se o usuário existe
        const isUser = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        // Erro caso não seja ou não exista
        if (!isUser) {
            return res.status(401).json({ msg: 'Usuário inexistente.' });
        }
        // Conversão de data
        const hourStart = startOfHour(parseISO(date));
        // Verifica se a data já passou
        if (isBefore(hourStart, new Date())) {
            return res.status(401).json({ msg: 'Data não permitida.' });
        }
        // Verifica disponibilidade
        const checkHour = await Event.findOne({
            where: {
                user_id: req.userId,
                canceled_at: null,
                date: parseISO(date),
            },
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
            date,
            name,
            description,
            location,
            banner_id,
        });
        // Notificação de Evento
        // Pegando dados do usuário
        const user = await User.findByPk(req.userId);
        // Formatando data para dia dd de mês às hh:mi
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );
        // Gerando notificação
        await Notification.create({
            content: `Novo evento agendado por: ${user.name} no ${formattedDate}`,
            user: req.userId,
        });

        return res.json(Events);
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            name: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            banner_id: Yup.number().required(),
        });
        // Gera erro se campo não for válido
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        // Relacionamento e filtros
        const { id, date, name, description, location, banner_id } = req.body;
        // Verifica se o usuário existe
        const Exists = await Event.findOne({
            where: {
                id,
            },
        });
        // Erro caso não seja ou não exista
        if (!Exists) {
            return res.status(401).json({ msg: 'Evento não encontrado.' });
        }
        // Se não for o criador do evento gera error
        if (Exists.user_id !== req.userId) {
            return res
                .status(401)
                .json({ msg: 'Apenas quem criou o evento pode modificá-lo.' });
        }
        // Conversão de data
        const hourStart = startOfHour(parseISO(date));
        // Verifica se a data já passou
        if (isBefore(hourStart, new Date())) {
            return res.status(401).json({ msg: 'Data não permitida.' });
        }
        // Verifica disponibilidade
        const checkCancelado = await Event.findOne({
            where: { id, canceled_at: null },
        });
        // Se já existir gera erro
        if (!checkCancelado) {
            return res.status(401).json({ msg: 'Evento foi cancelado.' });
        }
        // Verifica disponibilidade
        const checkConcluido = await Event.findOne({
            where: { id, successed_at: null },
        });
        // Se já existir gera erro
        if (!checkConcluido) {
            return res.status(401).json({ msg: 'Evento já foi concluído.' });
        }
        // Cria evento se tudo ok
        const Events = await Exists.update({
            user_id: req.userId,
            date,
            name,
            description,
            location,
            banner_id,
        });
        // Notificação de Evento
        // Pegando dados do usuário
        const user = await User.findByPk(req.userId);

        // Gerando notificação
        await Notification.create({
            content: `O evento ${name} foi modificado por: ${user.name}`,
            user: req.userId,
        });
        return res.json(Events);
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
        if (Exists.user_id !== req.userId) {
            return res
                .status(401)
                .json({ msg: 'Apenas quem criou o evento pode cancelá-lo.' });
        }
        // Atualizando informações
        await Event.destroy({
            where: {
                id,
            },
        });

        return res.json(Exists);
    }
}

export default new EventController();
