const { DataTypes } = require("sequelize");
const { sqliteconnector2 } = require("../../../database/configLite2");

const corteSQLiteSCD = sqliteconnector2.define('corte', {
    id:    { 
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    corte_fecha:    { type: DataTypes.TEXT },
    corte_hora:     { type: DataTypes.TEXT },
    dia:            { type: DataTypes.TEXT },
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
    corteSQLiteSCD
};