const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');
const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

const conexao = mysql.createConnection({
    host : "localhost",
    user : "fernando",
    password : "395395",
    database : "farmer",
    multipleStatements: true

});

conexao.connect((err) => {
    if(err)
    {
        console.error('Erro de conexção ' + + JSON.stringify(err));
    }
    else
    {
        console.log('conectado com muitíssimo sucesso!');
    }
});

app.get("/list", (req, res) =>{
    conexao.query("SELECT * FROM pessoa ", (err, rows, field) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.send(rows);
        }
    });
});

app.get("/main/:id", (req, res) =>{
    conexao.query("SELECT * FROM pessoa WHERE ID = ?", [req.params.id], (err, rows, field) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.send(rows);
        }
    });
});

app.delete("/main/:id", (req, res) =>{
    conexao.query("DELETE FROM pessoa WHERE ID = ?", [req.params.id], (err, rows, field) =>{
        if(err)
        {
            console.log("Erro : " + err);
        }
        else
        {
            res.send('DELETADO COM SUCESSO');
        }
    });
});

app.post("/main", (req, res) =>{
    let emp = req.body;
    /*var sql = "SET @id = ?; SET @no_pessoa =?; SET @no_email = ?; SET @endereco = ?; SET @sexo = ?; SET @ic_ativo = ?; \
    CALL Adicionar(@id,@no_pessoa,@no_email,@endereco,@sexo,@ic_ativo); ";*/
    let sql = "INSERT INTO `farmer`.`pessoa`(`id`,`no_pessoa`,`no_email`,\
    `endereco`, `sexo`,`ic_ativo`) VALUES (?,?,?,?,?,?);"
    conexao.query(sql,[emp.id, emp.no_pessoa, emp.no_email, emp.endereco, emp.sexo, emp.ic_ativo], (err, rows, field) =>{
        if(err)
        {
            console.log("Erro : " + err);
        }
        else
        {
            res.send(emp);
        }
    });
});

app.put("/main", (req, res) =>{
    let emp = req.body;
    let msql = "UPDATE `pessoa` SET `id`= ?, `no_pessoa`= ?, `no_email`= ?, `endereco`= ?,`sexo` = ?,`ic_ativo`= ? WHERE `id`= ?;";
    conexao.query(msql, [emp.id, emp.no_pessoa, emp.no_email, emp.endereco, emp.sexo, emp.ic_ativo, emp.id], (err, rows, field) =>{
        if(err)
        {
            console.log("Erro : " + err);
        }
        else
        {
            return res.send(emp);
        }
    });
});

app.listen(3000, ()=> console.log("Servidor Express rodando na porta: 3000"));