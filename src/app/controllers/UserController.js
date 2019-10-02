// Modelo do usuário
import User from '../models/Users';

class UserController {
    async store(req, res) {
        // Verifica se usuário já existe
        const Exists = await User.findOne({ where: { email: req.body.email } });

        if (Exists) {
            // Se usuário existe retorna erro
            Exists.password_hash = undefined;
            return res
                .status(400)
                .json({ msg: 'O usuário informado já existe!', Exists });
        }
        // Cria usuário
        const user = await User.create(req.body);

        user.password_hash = undefined;

        return res.json(user);
    }

    async update(req, res) {
        // Verifica se usuário existe
        const Exists = await User.findOne({ where: { email: req.body.email } });

        if (Exists) {
            // await User.
        }

        return res.status(400).json({ msg: 'Usuário não existe.' });
    }
}

export default new UserController();
