const router = require('express').Router()
const contactsRoute = require('./contacts')

router.get('/', (req, res) => res.send("Index page is working fine :)"))
router.use('/contacts', contactsRoute)

module.exports = router;