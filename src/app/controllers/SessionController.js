import jwt from 'jsonwebtoken';
// Modelo do usuário
import User from '../models/Users';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ msg: 'Usuário ou senha inválida!' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ msg: 'Senha inválida!' });
        }

        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, process.env.SECRET, {
                expiresIn: '7d',
            }),
        });
    }
}

export default new SessionController();
