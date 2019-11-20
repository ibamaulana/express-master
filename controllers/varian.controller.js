const Varian = require('../models/varian.model');

exports.findAll = (req, res) => {
    Varian.find()
    .populate('id_produk')
    .then(Varian => {
        res.send(Varian);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    
};

exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Varian content can not be empty"
        });
    }

    // Create a Varian
    const varian = new Varian({
        id_produk: req.body.id_produk,
        nama: req.body.nama,
        harga_beli: req.body.harga_beli,
        harga_jual: req.body.harga_jual,
        sku: req.body.sku,
    });

    // Save Note in the database
    varian.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};