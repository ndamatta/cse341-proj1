const mongodb = require('../data/database'); 
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const db = mongodb.getDatabase();
    const response = await db.collection('contacts').find();
    const contacts = await response.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = req.params.id;
    const objectId = new ObjectId(contactId);

    const db = mongodb.getDatabase();
    const response = await db.collection('contacts').find({ _id: objectId });
    const contacts = await response.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);

};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const db = mongodb.getDatabase();
    const response = await db.collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating a contact")
    }
}

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
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

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id)
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const db = mongodb.getDatabase()
    const response = await db.collection('contacts').deleteOne({ _id:contactId}, true);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating a contact")
    }
}

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
