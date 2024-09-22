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

module.exports = { getAll, getSingle };
