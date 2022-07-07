const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){

  res.render("list", {listTitle: date.getDate(), newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  console.log(req.body.list);

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.post("/work", function(req, res){
  workItems.push(req.body.newItem);
  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
