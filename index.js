require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sqlconnector } = require('./database/config');
const { sqlconnector2 } = require('./database/config2');
const { sqliteconnector } = require('./database/configLite');
const { sqliteconnector2 } = require('./database/configLite2');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const https = require('https');
const fs = require('fs');

app.use(cors({
    origin: '*'
}));

app.use(express.json());
// app.use(bodyParser.json());

/**
 * Estableciendo conexión con PREP de MSSQL
 */
sqlconnector
.authenticate()
.then(() => {
  console.log('Conexión correcta MSSQL PREP.');
})
.catch(err => {
  console.error('Error de conexión con PREP:', err);
});

/**
 * Estableciendo conexión con SCD de MSSQL
 */
sqlconnector2
.authenticate()
.then(() => {
  console.log('Conexión correcta MSSQL SCD.');
})
.catch(err => {
  console.error('Error de conexión con SCD:', err);
});

/**
 * Creando y estableciendo conexión con SQLite PREP (database.db3)
 */
sqliteconnector.sync().then(() => {
  console.log('Base de datos SQLITE PREP sincronizada');
}).catch(function(err) {
  console.log(err)
});

/**
 * Creando y estableciendo conexión con SQLite SCD (database.db3)
 */
sqliteconnector2.sync().then(() => {
  console.log('Base de datos SQLITE SCD sincronizada');
}).catch(function(err) {
  console.log(err)
});
  // let db = new sqlite3.Database('./database.db3', sqlite3.OPEN_READWRITE, (err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log('Basde de datos sincronizada');
  // });
  

// Prueba
app.use('/api/prep/migracion', require('./routes/migracion_prep.routes'));
app.use('/api/scd/migracion', require('./routes/migracion_scd.routes'));


//Desarrollo y local
// Lanzamiento del servicio
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});

//Producción
// https.createServer({
//     cert: fs.readFileSync('credentials/server.crt'),
//     key: fs.readFileSync('credentials/server.key')
// }, app).listen( process.env.PORT, () => {
//     console.log('Server corriendo en el puerto ' + process.env.PORT);
// });