const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();

const sequelize = new Sequelize("farmer", "fernando", "395395", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso.");
  })
  .catch((err) => {
    console.log("Erro ao realizar a conexão ao banco de dados!");
  });

const Pessoa = sequelize.define("pessoas", {
  nome_pessoa: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sexo: {
    type: Sequelize.CHAR,
    allowNull: true,
  },
  ic_ativo: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});
//Pessoa.sync({ force: true });

router.get("/list", async (req, res) => {
  try {
    const pessoa = await Pessoa.findAll();
    return res.send(pessoa);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
});

router.get("/query/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findOne({ where: { id: req.params.id } });
    res.send(pessoa);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
});

router.post("/create", async (req, res) => {
  const { nome_pessoa, email, endereco, sexo, ic_ativo } = req.body;

  try {
    const pessoa = await Pessoa.create({
      nome_pessoa,
      email,
      endereco,
      sexo,
      ic_ativo,
    });

    return res.send(pessoa);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao criar usuário " + err });
  }
});

router.put("/put/:id", async (req, res) => {
  const { nome_pessoa, email, endereco, sexo, ic_ativo } = req.body;

  try {
    const AcharPessoa = await Pessoa.findOne({ where: { id: req.params.id } });
    if (!AcharPessoa)
      return res.status(400).send({ error: "Usuário não registrado!" });

    await Pessoa.update(
      {
        nome_pessoa: nome_pessoa,
        email: email,
        endereco: endereco,
        sexo: sexo,
        ic_ativo: ic_ativo,
      },
      { where: { id: req.params.id } }
    );

    return res.send(req.body);
  } catch (err) {
    res.send("Erro ao atualizar usuário!" + err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    Pessoa.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar usuário " + err);
  }
});

module.exports = router;
