import Sequelize from 'sequelize';

import Address from '../app/models/Address';
import Contact from '../app/models/Contact';
import File from '../app/models/File';
import Phone from '../app/models/Phone';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Address, Contact, File, Phone, User];

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
