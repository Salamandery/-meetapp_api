import Sequelize, { Model } from 'sequelize';

class Events extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
                successed_at: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // FK
    static associate(models) {
        // FK id do arquivo
        this.belongsTo(models.Files, { foreignKey: 'banner_id', as: 'banner' });
        // FK id do usuário
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        // FK id do provedor
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}

export default Events;
