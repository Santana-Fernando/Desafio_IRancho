const express = require("express");
const router = express.Router();
const Lote = require("../models/lote");

router.get("/list", async (req, res) => {
  try {
    const lote = await Lote.findAll();
    return res.send(lote);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de lote" + err });
  }
});

router.get("/query/:id", async (req, res) => {
  try {
    const lote = await Lote.findOne({ where: { id: req.params.id } });
    res.send(lote);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de lote" + err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { no_lote, ds_lote } = req.body;

    const lote = await Lote.create({
      no_lote,
      ds_lote,
    });

    return res.send(lote);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao definir lote " + err });
  }
});

router.put("/put/:id", async (req, res) => {
  const { no_lote, ds_lote } = req.body;

  try {
    const AcharLote = await Lote.findOne({ where: { id: req.params.id } });
    if (!AcharLote)
      return res.status(400).send({ error: "Lote não registrado!" });

    await Lote.update(
      {
        no_lote: no_lote,
        ds_lote: ds_lote,
      },
      { where: { id: req.params.id } }
    );

    return res.send(req.body);
  } catch (err) {
    res.send("Erro ao atualizar lote!" + err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Lote.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar lote " + err);
  }
});

module.exports = router;
