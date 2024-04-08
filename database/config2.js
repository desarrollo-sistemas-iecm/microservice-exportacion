const { Sequelize } = require("sequelize");

/** Liga de conexión a Producción
 * 
 */
const sqlconnector2 = new Sequelize('jornada2024', 'sedimde2024_db', '8nYKrYmza3zx', {
    host: '145.0.40.70',
    dialect: 'mssql',
    define: {
        timestamps: false
    },
    logging: true, // Change in production
    dialectOptions: {
        options: { requestTimeout: 3000000 }
    } // false in dev Change in production
});

/** Liga de conexión a Desarrollo
 * 
 */
// const sqlconnector2 = new Sequelize('jornada2024', 'user1', 'u53r1', {
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
    sqlconnector2
}
