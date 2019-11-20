const Produk = require('../models/produk.model');
const mongoose = require('mongoose');

// Create data
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Produk content can not be empty"
        });
    }

    // Create a Produk
    const produk = new Produk({
        _id: new mongoose.Types.ObjectId(),
        nama: req.body.nama || "Untitled Produk", 
        uid: req.body.uid,
        kategori: req.body.kategori,
        status: req.body.status,
        type: req.body.type,
    });

    // Save Produk in the database
    produk.save()
    .then(data => {
        res.send(data);
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

// Update Status
exports.updatestatus = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Produk content can not be empty"
        });
    }

    // Find produk and update it with the request body
    Produk.findByIdAndUpdate(req.params.produkId, {
        status: req.body.status,
    }, {new: true})
    .then(produk => {
        //check if uid == dn3 or not
        if(produk.uid == 'dn3' && req.body.status == false) {
            console.log(produk._id)
            Produk.findByIdAndRemove(produk._id)
            .then(produks => {
                if(!produks) {
                    return res.status(404).send({
                        message: "produk not found with id " + req.params.produkId
                    });
                }
                res.send({message: "produk deleted successfully because uid = dn3 and set to false !"});
            })
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



