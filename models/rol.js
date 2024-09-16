const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
});

module.exports = mongoose.model('rol', rolSchema); // Model name capitalized