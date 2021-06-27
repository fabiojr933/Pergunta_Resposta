 const Sequelize = require('sequelize');
 const Connection = require("./database");

 const Pergunta = Connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
 });

 Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela Pergunta criada com suceso");
 });
module.exports = Pergunta;