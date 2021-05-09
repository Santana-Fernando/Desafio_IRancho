var DataTypes = require("sequelize").DataTypes;
var _animal = require("./animal");
var _animal_lote = require("./animal_lote");
var _lote = require("./lote");
var _pessoa = require("./pessoa");

function initModels(sequelize) {
  var animal = _animal(sequelize, DataTypes);
  var animal_lote = _animal_lote(sequelize, DataTypes);
  var lote = _lote(sequelize, DataTypes);
  var pessoa = _pessoa(sequelize, DataTypes);

  animal_lote.belongsTo(animal, { as: "fk_id_animal_animal", foreignKey: "fk_id_animal"});
  animal.hasMany(animal_lote, { as: "animal_lotes", foreignKey: "fk_id_animal"});
  animal_lote.belongsTo(lote, { as: "fk_id_lote_lote", foreignKey: "fk_id_lote"});
  lote.hasMany(animal_lote, { as: "animal_lotes", foreignKey: "fk_id_lote"});
  animal.belongsTo(pessoa, { as: "fk_id_pessoa_pessoa", foreignKey: "fk_id_pessoa"});
  pessoa.hasMany(animal, { as: "animals", foreignKey: "fk_id_pessoa"});

  return {
    animal,
    animal_lote,
    lote,
    pessoa,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
