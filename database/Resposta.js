const Sequelize = require('sequelize');
const Connection = require("./database");

const Resposta = Connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
Resposta.sync({ force: false });
module.exports = Resposta;