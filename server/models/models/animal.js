const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('animal', {
    id_animal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pessoa',
        key: 'id_pessoa'
      }
    },
    id_fazenda: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    no_animal: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    no_raca: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sexo: {
      type: DataTypes.ENUM('Masculino','Feminino'),
      allowNull: true
    },
    vr_peso: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    dt_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'animal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_animal" },
        ]
      },
      {
        name: "fk_id_pessoa",
        using: "BTREE",
        fields: [
          { name: "fk_id_pessoa" },
        ]
      },
    ]
  });
};
