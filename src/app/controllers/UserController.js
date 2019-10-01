// Modelo do usuário
import User from '../models/Users';

class UserController {
    async store(req, res) {
        const Exists = await User.findOne({ where: { email: req.body.email } });

        if (Exists) {
            return res
                .status(400)
                .json({ msg: 'O usuário informado já existe!', Exists });
        }

        const user = await User.create(req.body);

        user.password_hash = undefined;

        return res.json(user);
    }
}

export default new UserController();
