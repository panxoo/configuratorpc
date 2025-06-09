const multer = require('multer');

const storage = multer.memoryStorage(); // <<--- en memoria
const upload = multer({ storage: storage });

module.exports = upload;