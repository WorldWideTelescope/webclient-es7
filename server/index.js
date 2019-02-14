const express = require('express');
const app = express();
const path = require('path');
const port = 2345;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(path.resolve(__dirname,  '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,  '../dist/index.html'));
});
app.listen(port,() => console.log('simple server running on port ' + port));
