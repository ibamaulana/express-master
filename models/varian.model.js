const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const varianSchema = new Schema({
    id_produk: { type: Schema.Types.ObjectId, ref: 'Produk' },
    nama: {type: String, required: true, max: 100},
    harga_beli: {type: Number,required: true},
    harga_jual: {type: Number,required: true},
    sku: {type: String, required: true},
},{ collection : 'varian'});

// Export the model
module.exports = mongoose.model('Varian', varianSchema);