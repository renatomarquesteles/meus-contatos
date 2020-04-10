import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.INTEGER,
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

export default Address;
