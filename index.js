const app = require('./app') // the actual Express application
const http = require('http')
const logger = require('./utils/logger')
const notesRouter = require('./api/notes.router')


const server = http.createServer(app)

app.use('/api/notes', notesRouter)



server.listen( process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})