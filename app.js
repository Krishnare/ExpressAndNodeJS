const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is listening on port ${port}...`);
});
