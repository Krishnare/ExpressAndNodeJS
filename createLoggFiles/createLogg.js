const { format, createLogger, transports } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./createLoggFiles/combinedlogger.log" })
  ]
});

module.exports = logger;