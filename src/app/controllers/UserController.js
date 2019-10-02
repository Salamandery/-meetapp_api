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
        // Valores passados pelo body
        const { email, oldPassword } = req.body;

        // Verifica se usuário existe
        const Exists = await User.findByPk(req.userId);

        if (email !== Exists.email) {
            // Verificando se email existe
            const emailExists = await User.findOne({ where: { email } });

            if (emailExists) {
                return res
                    .status(400)
                    .json({ msg: 'O usuário informado já existe!', Exists });
            }
        }
        // Verificação de mudança de senha
        if (oldPassword && !(await Exists.checkPassword(oldPassword))) {
            // Se senha não bater
            return res.status(401).json({ msg: 'Senha inválida.' });
        }
        // Atualização do usuário
        const user = await Exists.update(req.body);

        user.password_hash = undefined;

        return res.json({ msg: 'Alteração realizada com sucesso', user });
    }
}

export default new UserController();
