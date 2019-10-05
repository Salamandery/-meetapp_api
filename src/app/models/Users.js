import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        // Operação executada antes de criar um usuário
        this.addHook('beforeSave', async user => {
            if (user.password) {
                // Criptografando senha antes de criação do usuário
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    // FK
    static associate(models) {
        // FK id do arquivo
        this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    checkPassword(password) {
        // Verifica se a senha está correta
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
