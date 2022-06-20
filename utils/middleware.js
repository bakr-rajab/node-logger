const { level } = require('winston')
const { logger } = require('./logger')
var client = require('mongoose')


const requestLogger =  (request, response, next) => {
  // logger.info(request.method)
  // let p = request.path.split('/')[2]
  // console.log("99999999", p);
  // logger.info(`"PATH: ", ${request.path}`)
  // logger.info("body : ", request.body)
  // logger.info('---')

  try {
    if(request.method != 'GET'){
      let logg={};
      logg=request.body;
      logg.method=request.method;
      logg.path=request.path;
      console.log(logg);
      const db = client.connection.db;
        db.collection(request.path.split('/')[2]).insertOne({req:logg}, { checkKeys: false });
    }
    next()
    
  } catch (error) {
    console.log("555555555555555",error);
    logger.error(error)
    next()
  }
}

const unknownEndpoint = (request, response, next) => {
  
  console.log("unknownEndpoint 55555555555552222255");
  // response.status(404).send({ error: 'unknown endpoint' })
  const err=new Error(`cant find >>>> ${request.originalUrl} `)
  err.statusCode= 404;
  err.status= 'error1';
  next(err);
}

const errorHandler = (error, request, response, next) => {
  console.log("errorHandler error",error);
  console.log("errorHandler request",request.body);
  console.log("errorHandler response",response);
  console.log("errorHandler next",next);

  let err={};
  err.message = error.message;
  err.statusCode=error.statusCode || 500;
  err.status=err.status || 'error'
  logger.error(err)
  response.setHeader('Cache-Control', 'no-cache');
  // response.status(err.statusCode).json({message:err.message,status:error.status})
  // if (error.name === 'CastError') {
  //   return response.status(400).send({ error: 'malformatted id' })
  // } else if (error.name === 'ValidationError') {
  //   return response.status(400).json({ error: error.message })
  // }

  // next(error)
}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}