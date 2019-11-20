const Varian = require('../models/varian.model');
const Produk = require('../models/produk.model');

// Create data
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Varian content can not be empty"
        });
    }

    // Create a varian
    const varian = new Varian({
        id_produk: req.body.id_produk,
        nama: req.body.nama,
        harga_beli: req.body.harga_beli,
        harga_jual: req.body.harga_jual,
        sku: req.body.sku,
    });

    // Save varian in the database
    varian.save()
    .then(data => {
        //get varian produk
        Produk.findById(data.id_produk)
        .then(produk => {
            if(!produk) {
                return res.status(404).send({
                    message: "produk not found with id " + req.params.produkId
                });            
            }
            var newvarians = produk.varians
            newvarians.push(data._id)
            Produk.findByIdAndUpdate(data.id_produk, {
                varians: newvarians
            }, {new: true})
            .then(produk => {
                if(!produk) {
                    return res.status(404).send({
                        message: "produk not found with id " + req.params.produkId
                    });
                }
                res.send(data);
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Produk."
        });
    });
};

// Get data
exports.findAll = (req, res) => {
    Produk.find({status: true})
    .populate('varians')
    .then(Produk => {
        res.send(Produk);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving produk."
        });
    });
};

// Get detail data
exports.findOne = (req, res) => {
    Produk.findById(req.params.produkId)
    .then(produk => {
        if(!produk) {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });            
        }
        res.send(produk);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving produk with id " + req.params.produkId
        });
    });
};

// Update data
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Produk content can not be empty"
        });
    }

    // Find produk and update it with the request body
    Produk.findByIdAndUpdate(req.params.produkId, {
        nama: req.body.nama || "Untitled Produk", 
        uid: req.body.uid,
        kategori: req.body.kategori,
        status: req.body.status,
        type: req.body.type,
        varians: req.body.varians
    }, {new: true})
    .then(produk => {
        if(!produk) {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });
        }
        res.send(produk);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });                
        }
        return res.status(500).send({
            message: "Error updating produk with id " + req.params.produkId
        });
    });
};

// Delete data
exports.delete = (req, res) => {
    Produk.findByIdAndRemove(req.params.produkId)
    .then(produk => {
        if(!produk) {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });
        }
        res.send({message: "produk deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "produk not found with id " + req.params.produkId
            });                
        }
        return res.status(500).send({
            message: "Could not delete produk with id " + req.params.produkId
        });
    });
};