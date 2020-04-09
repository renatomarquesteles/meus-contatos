import Sequelize from 'sequelize';

import Contact from '../app/models/Contact';
import Phone from '../app/models/Phone';

import databaseConfig from '../config/database';

const models = [Contact, Phone];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
