//jshint esversion:6

var superheroes = require("superheroes");
var supervillains = require("supervillains");

var mySuperheroName = superheroes.random();
var mySupervillainsName = supervillains.random();

console.log("My hero is " + mySuperheroName);
console.log("My villain is " + mySupervillainsName);
