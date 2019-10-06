import Sequelize, { Model } from 'sequelize';

class UserEvent extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.INTEGER,
                event_id: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // FK
    static associate(models) {
        // FK id do Evento
        this.belongsTo(models.Events, { foreignKey: 'event_id', as: 'event' });
        // FK id do usuário
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default UserEvent;
