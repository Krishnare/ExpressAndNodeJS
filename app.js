const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const logger = require("./createLoggFiles/createLogg");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

app.use(morgan("dev"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


const port = process.env.PORT || 6000;
app.listen(port, () => {
  logger.info(`Application is listening on port, ${port}...`);
});
