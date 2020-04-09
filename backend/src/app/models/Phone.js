import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        phone_number: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Contact, { foreignKey: 'contact_id', as: 'contato' });
  }
}

export default Phone;
