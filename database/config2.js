const { Sequelize } = require("sequelize");

/** Liga de conexión a Producción
 * 
 */
// const sqlconnector = new Sequelize('siseced2024', 'siseced2024_db', 'wzP2nxd9YzqK', {
//     host: 'prodnodeangular.database.windows.net',
//     dialect: 'mssql',
//     define: {
//         timestamps: false
//     },
//     logging: true, // Change in production
//     dialectOptions: {
//         options: { requestTimeout: 3000000 }
//     }
// });

/** Liga de conexión a Desarrollo
 * 
 */
const sqlconnector2 = new Sequelize('jornada2024', 'user1', 'u53r1', {
    host: '145.0.40.72',
    dialect: 'mssql',
    dialectOptions: {
        options: {
          "encrypt": false
        }
    },
    define: {
        timestamps: false
    },
    logging: false // false in dev Change in production
});


module.exports = {
    sqlconnector2
}
