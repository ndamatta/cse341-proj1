const mongodb = require('../data/database'); 
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    const contactId = req.params.id;

    const db = mongodb.getDatabase();
    const objectId = new ObjectId(contactId);
    const result = await db.collection('contacts').find({ _id: objectId });
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);

};

const createUser = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating an user")
    }
}

const updateUser = async (req, res) => {
    const contactId = new ObjectId(req.params.id)
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const db = mongodb.getDatabase();
    const response = await db.collection('contacts').replaceOne({ _id:contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating an user")
    }
}

const deleteUser = async (req, res) => {
    const contactId = new ObjectId(req.params.id)
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').delete({ _id:contactId}, true);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating an user")
    }
}

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
