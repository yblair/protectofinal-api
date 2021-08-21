const mongoose = require('mongoose');

const Producto = mongoose.model('productos', {
    name : {
        type: String,
        required: true        
        },
    price: {
        type: Number,
        required: true
    },
    img: { 
        type: String,
        required: true
    }
});

module.exports = Producto;
