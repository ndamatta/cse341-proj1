const router = require('express').Router()
const contactsRoute = require('./contacts')
const swaggerRoute = require('./swagger')

router.use('/', swaggerRoute);
router.get('/', (req, res) => {res.send('Hello world')})

router.get('/', (req, res) => res.send("Index page is working fine :)"))
router.use('/contacts', contactsRoute)

module.exports = router;