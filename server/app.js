const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const pessoa = require("./Routes/pessoas");
const animal = require("./Routes/animais");
const lote = require("./Routes/lotes");
const AnimalLote = require("./Routes/animaiLotes");

app.use(cors());

app.use(express.json());

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({ extended: false }));

app.use("/pessoa", pessoa);

app.use("/animal", animal);

app.use("/lote", lote);

app.use("/animal_lote", AnimalLote);

app.listen(3000, () => console.log("Servidor Express rodando na porta: 3000"));

module.exports = app;
