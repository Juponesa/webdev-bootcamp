//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

// Database stuffs
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articlesSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("article", articlesSchema);
// End DB

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.route("/articles")
  .get(function(req, res){
    Article.find({}, function(err, articlesFound){
      if (!err) {
        res.send(articlesFound);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err){
      if (!err) {
        res.send("Successfully added a new article.")
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res){
    Article.deleteMany({}, function(err){
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    })
});

app.route("/articles/:articleTitle")

  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
      if (!err) {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles matching that title was found.")
        }
      } else {
        res.send(err);
      }
    })
  })

  .put(function(req, res){
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {title: req.body.title,
        content: req.body.content},
      {overwrite: true},
      function(err) {
        if (!err) {
          res.send("Successfully updated article");
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch(function(req, res) {
    Article.updateOne(
      {title: req.params.articleTitle},
      {$set: req.body},
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }

    );
  })
  .delete(function(req, res) {
    Article.deleteOne({title: req.params.articleTitle}, function(err){
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
