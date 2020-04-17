import Sequelize, { Model } from 'sequelize';

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Phone, { foreignKey: 'contact_id', as: 'phones' });
    this.hasMany(models.Address, { foreignKey: 'contact_id', as: 'addresses' });
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Contact;
