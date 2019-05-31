const express = require("express");
const router = express.Router();
const logger = require("../createLoggFiles/createLogg");

let fs = require("fs");
const newsJson = eval(fs.readFileSync("newsJson.js") + "");
const newsDetails = newsJson;

router.get("/", (req, res, next) => {
  logger.info(req.originalUrl);
  res.status(200).json({
    massage: "Handling Get Request",
    newsJson: newsJson
  });
});

router.post("/:id", (req, res, next) => {
  logger.info(req.originalUrl);
  const sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id);

  if (!req.body.name || !req.body.id) {
    console.log("nothing");
  } else {
    singleNews.id = req.body.id;
    singleNews.name = req.body.name;
  }
  res.status(201).json({
    massage: "Handling Post Request",
    someObj: singleNews
  });
});

router.put("/:id", (req, res, next) => {
  logger.info(req.originalUrl);
  let sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id);

  if (!req.body.name || !req.body.id) {
    console.log("Nothing");
  } else {
    singleNews.id = req.body.id;
    singleNews.name = req.body.name;
  }

  res.status(200).json({
    massage: "Handling Put Request",
    singleNews: singleNews
  });
});

router.delete("/:id", (req, res, next) => {
  logger.info(req.originalUrl);
  let sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id);
  const indexVal = sources.indexOf(singleNews);
  sources.splice(indexVal, 1);
  if (singleNews.id.length < 3) {
    sources = singleNews;
  }
  res.status(200).json({
    massage: `Handling Delete Request ${req.params.id}`,
    sources: sources
  });
  
});



module.exports = router;
