import * as Yup from 'yup';
// Modelo do usuário
import User from '../models/Users';

class UserController {
    async index(req, res) {
        // Listando usuários
        const users = await User.findOne({
            where: {
                id: req.userId,
            },
            attributes: ['id', 'name', 'email', 'created_at'],
        });

        return res.json(users);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

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
        // Validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            oldPassword: Yup.string(),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
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

        user.password = undefined;
        user.password_hash = undefined;

        return res.json({ msg: 'Alteração realizada com sucesso', user });
    }
}

export default new UserController();
