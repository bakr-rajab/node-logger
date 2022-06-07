const winston = require('winston')
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint, splat, printf } = format;
// require('express-async-errors');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
winston.add(new transports.Console({ colorize: true, prettyPrint: true }));

const logger = createLogger({
  levels: logLevels,
  format: combine(
    timestamp(),
    prettyPrint()
  ),

  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: "outputfile.log", level: 'debug' }),
  ]
});

module.exports = {
  logger,
}