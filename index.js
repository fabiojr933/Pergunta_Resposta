const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//database
Connection
    .authenticate()
    .then(() => {
        console.log('conectado');
    })
    .catch((msgErro) => {
        console.log("Erro ao se conectar com o banco " + msgErro);
    });

/**
 * estou dizendo para o express usar o EJS
 */
app.set("view engine", "ejs");

/**
 * Pagina padrao dos arquivos staticos
 */
app.use(express.static("public"));

/**
 *  bodyParser no express
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * rotas
 */
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'desc']
        ]
    }).then(pergunta => {
        res.render("index", {
            pergunta: pergunta
        });
    });

});
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'desc']
                ]
            }).then(resposta => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.post("/responder", (req, res) => {
    var resposta = req.body.resposta;
    var perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo: resposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

/**
 * Inicia o Servidor
 */
app.listen(8080, () => {
    console.log("Servidor rodando");
});