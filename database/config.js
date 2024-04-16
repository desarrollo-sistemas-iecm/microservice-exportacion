const { Sequelize } = require("sequelize");

/** Liga de conexión a Producción
 * 
 */
const sqlconnector = new Sequelize('Sicodid_prep2024', 'sicodid2024', 's1c0d1d2024', {
    host: '145.0.179.23',
    dialect: 'mssql',
    define: {
        timestamps: false
    },
    logging: true, // Change in production
    dialectOptions: {
        options: { requestTimeout: 3000000 }
    }
});

/** Liga de conexión a Desarrollo
 * 
 */
// const sqlconnector = new Sequelize('prep2021', 'user1', 'u53r1', {
//     host: '145.0.40.72',
//     dialect: 'mssql',
//     dialectOptions: {
//         options: {
//           "encrypt": false
//         }
//     },
//     define: {
//         timestamps: false
//     },
//     logging: false // false in dev Change in production
// });


module.exports = {
    sqlconnector
}
