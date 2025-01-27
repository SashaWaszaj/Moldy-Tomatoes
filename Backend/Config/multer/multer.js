const multer = require('multer');
const path = require('path');


// Configuración del almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Obtenemos la extensión del archivo
        const fileName = `${Date.now()}-${file.originalname}`;  // Generamos un nombre único para el archivo
        cb(null, fileName);  // Usamos el nombre único para evitar conflictos
    }
});

// Filtrar solo imágenes para ser subidas
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);  // Si el archivo es una imagen, lo permitimos
    } else {
        cb(new Error('No es una imagen válida'), false);  // Rechazamos si no es una imagen
    }
};

// Crear el middleware de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño del archivo a 5MB
});

module.exports = upload;
