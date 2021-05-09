const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pessoa', {
    id_pessoa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    no_pessoa: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    no_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sexo: {
      type: DataTypes.ENUM('Masculino','Feminino'),
      allowNull: true
    },
    ic_ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pessoa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
