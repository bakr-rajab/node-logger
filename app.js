const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./api/notes.router')
const middleware = require('./utils/middleware')
const {logger} = require('./utils/logger')
const mongoose = require('mongoose')
// let log=new logger()
// console.log("888888888888888",log.info("***---------------***"));

logger.info('connecting to : '+`${process.env.MONGODB_URI}`)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:'+ `${error.message}`)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
