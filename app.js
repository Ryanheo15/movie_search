//Init
const express = require("express");
const app = express();
app.use(express.static("public"));
const fetch = require("node-fetch");

//Routes
app.get("/", (req, res) => {
  res.render("search.ejs");
});

app.get("/results", (req, res) => {
  let search_param = req.query.search;
  let url = `http://www.omdbapi.com/?s=${search_param}&apikey=thewdb`;

  //Retrieving data
  let response = fetch(url);
  response.then((rep) => {
    return rep.json();
  }).then((rep_data) => {
    let movie_data = rep_data;
    res.render("results.ejs", {data: movie_data});
  }).catch((err) => {
    console.log(err);
  });

});

app.get("*", (req,res) => {
  res.render("error.ejs");
});


//Listen
app.listen(3000,() => {
  console.log("Working");
})
