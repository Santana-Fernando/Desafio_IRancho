
const Pessoa = require("../models/pessoa");
module.exports = class Usuario {

  listarTodosOsUsuarios = async (req, res) => {
    try {
      const pessoa = await Pessoa.findAll();
      return res.send(pessoa);
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Erro na consulta de usuários" + err });
    }
  };
  
  cadastrarNovoUsuario = async (req, res) => {
    try {
      const { no_pessoa, no_email, endereco, sexo, ic_ativo } = req.body;
  
      let pessoa = await Pessoa.create({
        no_pessoa,
        no_email,
        endereco,
        sexo,
        ic_ativo,
      });
  
      return res.send(pessoa);
    } catch (err) {
      return res.status(500).send({ error: "Erro ao criar usuário " + err });
    }
  };
  
  atualizarDadosDaUsuario = async (req, res) => {
    const { no_pessoa, no_email, endereco, sexo, ic_ativo } = req.body;
  
    let pessoa = await Pessoa.create({
      no_pessoa,
      no_email,
      endereco,
      sexo,
      ic_ativo,
    });
  
    try {
      await Pessoa.update(pessoa, { where: { id_pessoa: req.params.id_pessoa } });
      return res.send(req.body);
    } catch (err) {
      res.send("Erro ao atualizar usuário!" + err);
    }
  };
  
  excluirUsuario = async (req, res) => {
    try {
      await Pessoa.destroy({ where: { id_pessoa: req.params.id_pessoa } });
      res.send(`Foi deletado com sucesso!`);
    } catch (err) {
      res.send("Erro ao deletar usuário " + err);
    }
  };

}
