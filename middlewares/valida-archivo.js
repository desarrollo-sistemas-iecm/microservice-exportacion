const multer = require("multer");
const fs = require("fs");
//Carga del archivo asociado a este registro
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //Solicita el idDistrito
        //Crea nombre del folder del distrito
        const { idSesion } = req.params;
        console.log(idSesion);
        const nombreFolder = `uploads/sesiones/sesion-${idSesion}/acreditaciones-sesion`;
        //Si el folder del distrito no existe, crea el folder para cargar ahí la infomación relacionado a las acrditaciones de los monos
        if(!fs.existsSync(nombreFolder)){
            fs.mkdirSync(nombreFolder);
        }
        //Directorio de carga para multer
        const pathStorage = `${__dirname}/../${nombreFolder}`;
        cb(null, pathStorage)
    },
    filename: function(req, file, cb){
        //Para el archivo de la acreditación, sólo se aceptan PDF Y ZIP propuesta por el curso.
        //Para obtener el formato del archivo a partir de su nombre, haciendo split hasta el último punto en su nombre propuesto en el curso. MAL, puede fallar.
        const ext = file.originalname.split('.').pop; // Obtención de la extensión del archivo
        console.log('Extensión: ',file.originalname);
        //Para obtener el formato del archivo a partir de su mimetype compuesto por los primeros bytes compuestos por el archivo. Sólo acepta PDF y ZIP
        if (file.mimetype == 'application/pdf'){
            const filename = `doc_acredita-${Date.now()}.pdf`;
            cb(null,filename);
        } else if(file.mimetype == 'application/zip' || file.mimetype == 'application/x-zip-compressed' || file.mimetype == 'application/octet-stream'){
            const filename = `doc_acredita-${Date.now()}.zip`;
            cb(null,filename);
        }
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/pdf'|| file.mimetype == 'application/zip' || file.mimetype == 'application/x-zip-compressed') {
            cb(null, true);
        } else {
            //return cb(501);
            return callback(new Error('Formato del archivo no es valido.'));
        }
    }
});

// cambiar el valor de X *1024 * 1024 para el máximo permitido en MB
const middlewaresFile = multer({storage: storage, limits: { fileSize: 10 * 1024 * 1024 }});

module.exports = middlewaresFile;