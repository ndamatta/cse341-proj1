const router = require('express').Router()
const contactsRoute = require('./contacts')

router.use('/contacts', contactsRoute)

module.exports = router;