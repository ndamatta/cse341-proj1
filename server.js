const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/database')
const app = express();
const indexRoute = require('./routes')

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/', indexRoute);

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log('Database and node running')})
    }
})

