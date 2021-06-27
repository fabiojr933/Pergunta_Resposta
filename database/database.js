const  Sequelise = require("sequelize");
const Connection = new Sequelise("perguntas", "root", "root",{
    host: "127.0.0.1",
    dialect: "mysql"
});
module.exports = Connection;