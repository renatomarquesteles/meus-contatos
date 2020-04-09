module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'docker',
  database: 'meus_contatos_mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
