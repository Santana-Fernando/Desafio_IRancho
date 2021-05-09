const express = require("express");
const router = express.Router();

const SevicosDeUsuario = require("../Services/pessoas");
const servicosDeUsuario = new SevicosDeUsuario

router.get("/list", servicosDeUsuario.listarTodosOsUsuarios);
router.post("/create", servicosDeUsuario.cadastrarNovoUsuario);
router.put("/put/:id", servicosDeUsuario.atualizarDadosDaUsuario);
router.delete("/delete/:id", servicosDeUsuario.excluirUsuario);

module.exports = router;
