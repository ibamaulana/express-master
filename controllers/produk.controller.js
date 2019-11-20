const Produk = require('../models/produk.model');
const Varian = require('../models/varian.model');
const mongoose = require('mongoose');

exports.findAll = (req, res) => {
    Produk.find({status: true})
    .populate('varians')
    .then(Produk => {
        res.send(Produk);
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

    // Save Note in the database
    produk.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};