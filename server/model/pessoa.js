const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Pessoa = sequelize.define("pessoas", {
  nome_pessoa: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sexo: {
    type: Sequelize.CHAR,
    allowNull: true,
  },
  ic_ativo: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Pessoa;
