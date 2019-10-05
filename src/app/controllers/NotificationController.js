// Modelos
// User
import User from '../models/Users';
// Schemas
// Notificação
import Notifications from '../schema/Notifications';

class NotificationController {
    async index(req, res) {
        // Verifica se o usuário é provedor e existe
        const isProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });
        // Erro caso não seja ou não exista
        if (!isProvider) {
            return res
                .status(401)
                .json({ msg: 'Acesso permitido apenas para provedores.' });
        }
        // Listando notificações do usuário logado
        const notification = await Notifications.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notification);
    }

    async update(req, res) {
        // Variaveis da url
        const { id } = req.params;
        // Atualizando notificação
        const notification = await Notifications.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        return res.json(notification);
    }
}

export default new NotificationController();
