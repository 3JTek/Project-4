require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./config/routes')
const config = require('./config/environment')

const app = express()

mongoose.connect(config.dbURI)

app.use(bodyParser.json())

app.use(express.static(`${__dirname}/dist`))

app.use('/api', routes)
app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(config.port, () => console.log(`Express is running on port ${config.port}`))

module.exports = app
