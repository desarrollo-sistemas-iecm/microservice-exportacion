const { Sequelize } = require("sequelize");
const { SQLite } = require('sqlite3');

/** Liga de conexión a Desarrollo
 * 
 */

const sqliteconnector2 = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db3/scd/database.db3',
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    logging: true // false in dev Change in production
});


module.exports = {
    sqliteconnector2
}
