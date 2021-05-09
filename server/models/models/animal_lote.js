const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('animal_lote', {
    id_animal_lote: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_id_animal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'animal',
        key: 'id_animal'
      }
    },
    fk_id_lote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'lote',
        key: 'id_lote'
      }
    },
    dt_entrada: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dt_saida: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dt_ultima_movimentacao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ic_bezerro: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'animal_lote',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_animal_lote" },
        ]
      },
      {
        name: "fk_id_animal",
        using: "BTREE",
        fields: [
          { name: "fk_id_animal" },
        ]
      },
      {
        name: "fk_id_lote",
        using: "BTREE",
        fields: [
          { name: "fk_id_lote" },
        ]
      },
    ]
  });
};
