const { DataTypes } = require("sequelize");
const { sqliteconnector } = require("../../../database/configLite");

const corteSQLite = sqliteconnector.define('configura', {
    id:    { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    header:    { type: DataTypes.TEXT },
    footer:     { type: DataTypes.TEXT },
    logo:            { type: DataTypes.TEXT },
    mes:            { type: DataTypes.TEXT},
    anio:           { type: DataTypes.TEXT },
    hora:           { type: DataTypes.TEXT },
    minuto:         { type: DataTypes.TEXT },
    segundo:        { type: DataTypes.TEXT },
}, 
{
    freezeTableName: true
});

module.exports = {
    corteSQLite
};