const express = require('express')
const path = require('path')
const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

module.exports = app