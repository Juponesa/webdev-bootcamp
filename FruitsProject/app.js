const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 37
// });
const mango = new Fruit({
  name: "Mango",
  rating: 8,
  review: "Juicy fruit."
});

mango.save();
//
// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });
//
// person.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Sucessfully updated the document");
  }
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Nice fruit."
});

const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "The basic one."
});

const orange = new Fruit({
  name: "Orange",
  rating: 5,
  review: "Too sour for me."
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Sucessfully saved all the fruits to fruitsDB.");
//   }
// });


// Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Sucessfully removed the Peach.");
//   }
// });

// Fruit.find(function(err, fruits){
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     fruits.forEach((fruit, i) => {
//       console.log(fruit.name);
//     });
//   }
//
// });
