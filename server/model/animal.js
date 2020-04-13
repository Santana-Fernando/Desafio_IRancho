const Sequelize = require("sequelize");
const sequelize = require("../config/conection");
const pessoa = require("./pessoa");

const Animal = sequelize.define("animal", {
  id_pessoa: {
    type: Sequelize.INTEGER,
  },
  id_fazenda: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  no_animal: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  no_raca: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sexo: {
    type: Sequelize.CHAR,
    allowNull: true,
  },
  vr_peso: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  dt_nascimento: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

Animal.sync({ force: true });

module.exports = Animal;
