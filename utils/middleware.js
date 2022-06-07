const { level } = require('winston')
const { logger } = require('./logger')
var client = require('mongoose')


const requestLogger =  (request, response, next) => {
  logger.info(request.method)
  let p = request.path.split('/')[2]
  console.log("99999999", p);
  logger.info(`"PATH: ", ${request.path}`)
  logger.info("body : ", request.body)
  logger.info('---')

  try {
    
    const db = client.connection.db;
      db.collection("repooo").insertOne({ req: request.body }, { checkKeys: false });
    
  } catch (error) {
    console.log("555555555555555",error);
    logger.error(error)
  }


  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}