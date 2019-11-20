const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produkSchema = new Schema({
    _id: Schema.Types.ObjectId,
    uid: {type: String,required: true},
    nama: {type: String, required: true, max: 100},
    kategori: {type: String,required: true},
    status: {type: Boolean,required: true},
    type: {type: String, required: true},
    varians : [{ type: Schema.Types.ObjectId, ref: 'Varian' }]
},{ collection : 'produk'});

// Export the model
module.exports = mongoose.model('Produk', produkSchema);

