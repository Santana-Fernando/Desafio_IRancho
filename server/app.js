const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const pessoa = require("./Routes/pessoas");
const animal = require("./Routes/animais");

app.use(express.json());

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({ extended: false }));

app.use("/pessoa", pessoa);

app.use("/animal", animal);

app.listen(3000, () => console.log("Servidor Express rodando na porta: 3000"));

module.exports = app;
