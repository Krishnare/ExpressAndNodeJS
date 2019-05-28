const express = require('express');
const path = require('path');
const app = express();
// const bodyParser = require('body-parser');

let fs = require('fs');
const newsJson = eval(fs.readFileSync('newsJson.js')+'');

app.use(express.static('public'));
app.use(express.json());

const newsDetails = newsJson;


app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/news', (req, res) => {
  res.send(newsDetails);
})
app.post('/news/source/:id', (req, res) => {
  const sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id)
  res.send(JSON.stringify(singleNews));
})
app.put('/news/source/:id', (req, res)=>{
  const sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id);

  res.end(JSON.stringify(singleNews));
})
app.delete('/news/source/:id', (req, res)=>{
  const sources = newsDetails[0].sources;
  const singleNews = sources.find(c => c.id === req.params.id)
  const indexVal = sources.indexOf(singleNews)
        sources.splice(indexVal, 1);
  res.send(JSON.stringify(sources));
})
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application is listening on port ${port}...`);
})
