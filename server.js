const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Comment = require('./model/comments')

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://klint:react@ds123351.mlab.com:23351/comments')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Backend looks good'});
});

router.route('/comments')
  // retrieving all comments from the database.
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      res.json(comments)
    });
  })

  // posting  a new comment to the database.
  .post(function(req, res) {
    var comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'comment successfully added.'})
    });
  });


app.use('/api', router);

app.listen(port, function() {
  console.log(`Backend runs on port ${port}`);
})
