const express = require("express");
const router = express.Router();
const Animal = require("../models/animal");
const Pessoa = require("../models/pessoa");

router.get("/list", async (req, res) => {
  try {
    const animal = await Animal.findAll();
    return res.send(animal);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
});

router.get("/query", async (req, res) => {
  try {
    const pessoa = await Pessoa.findAll({ where: { ic_ativo: true } });
    res.send(pessoa);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de animal" + err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      fk_id_pessoa,
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
    } = req.body;
    console.log(req.body);
    const animal = await Animal.create({
      fk_id_pessoa,
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
    });
    return res.send(animal);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao cadatrar animal " + err });
  }
});

router.put("/put/:id", async (req, res) => {
  const {
    fk_id_pessoa,
    id_fazenda,
    no_animal,
    no_raca,
    sexo,
    vr_peso,
    dt_nascimento,
  } = req.body;

  try {
    const AcharAnimal = await Animal.findOne({ where: { id: req.params.id } });
    if (!AcharAnimal)
      return res.status(400).send({ error: "Animal não registrado!" });

    await Animal.update(
      {
        fk_id_pessoa: fk_id_pessoa,
        id_fazenda: id_fazenda,
        no_animal: no_animal,
        no_raca: no_raca,
        sexo: sexo,
        vr_peso: vr_peso,
        dt_nascimento: dt_nascimento,
      },
      { where: { id: req.params.id } }
    );
    return res.send(req.body);
  } catch (err) {
    res.send("Erro ao atualizar Animal!" + err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Animal.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar animal " + err);
  }
});

module.exports = router;
