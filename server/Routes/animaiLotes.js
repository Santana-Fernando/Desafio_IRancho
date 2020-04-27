const express = require("express");
const router = express.Router();
const AnimalLote = require("../models/animalLote");

router.get("/list", async (req, res) => {
  try {
    const animalLote = await AnimalLote.findAll();
    return res.send(animalLote);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
});

router.get("/query/:id", async (req, res) => {
  try {
    const animalLote = await AnimalLote.findOne({
      where: { id: req.params.id },
    });
    res.send(animalLote);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de animal" + err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
    } = req.body;

    const animalLote = await AnimalLote.create({
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
    });

    return res.send(animalLote);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao cadatrar animal " + err });
  }
});

router.put("/put/:id", async (req, res) => {
  const {
    fk_id_animal,
    fk_id_lote,
    dt_entrada,
    dt_saida,
    dt_ultima_movimentacao,
    ic_bezerro,
  } = req.body;

  try {
    const AcharAnimalLote = await AnimalLote.findOne({
      where: { id: req.params.id },
    });
    if (!AcharAnimalLote)
      return res.status(400).send({ error: "Animal não registrado!" });

    await AnimalLote.update(
      {
        fk_id_animal: fk_id_animal,
        fk_id_lote: fk_id_lote,
        dt_entrada: dt_entrada,
        dt_saida: dt_saida,
        dt_ultima_movimentacao: dt_ultima_movimentacao,
        ic_bezerro: ic_bezerro,
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
    await AnimalLote.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar animal " + err);
  }
});

module.exports = router;
