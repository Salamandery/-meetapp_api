// Modelos
// Usuário
import User from '../models/Users';
// Arquivos
import files from '../models/Files';

class ProviderController {
    async index(req, res) {
        // Relacionamento e filtros
        const Providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: files,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });

        return res.json(Providers);
    }
}

export default new ProviderController();
