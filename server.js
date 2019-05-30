const express = require('express');
const path = require('path');
const app = express();

// const helloRouter = require('./routers/hello');

// app.use('/hello', helloRouter);

app.use('/static', express.static('public'))

app.get('/user/:id/details', (req, res, next) => {
  if (req.params.id === 'vladimir') {
    next('route');
  } else {
    res.send('Hi ' + req.params.id);
  }
}, (req, res, next) => {
  res.send('Qwerty 4 ' + req.params.id);
}, (req, res, next) => {
  res.send('Qwerty 5 ' + req.params.id);
});

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
});

app.listen(8000, () => {
  console.log('Application is listening on port 8000');
})
