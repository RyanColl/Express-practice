/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs").promises;

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index2"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  movie = req.body.genres;
  movies = movie.split(", ");
  res.render("pages/index2", {movies: movies})
});


app.get("/myListQueryString", (req, res) => {
  let queryMovie = [];
  queryMovie.push(req.query.movie1);
  queryMovie.push(req.query.movie2);
  res.render("pages/index2",{queryMovie: queryMovie});
});


app.get("/search/:movieName", (req, res) => {
  let database = [];
  fs.readFile("./movieDescriptions.txt", {encoding:"utf-8"})
  .then((data)=>{
    let movieDesc = data.split("\r\n");
    let eachMovie =[];
    movieDesc.forEach((movie)=>{
      eachMovie = movie.split(":");
      database.push(eachMovie);
      
    })
    let querySearch = req.url.split("/search/");
    querySearch.shift();
    let searchResult = false;
      if(database[0][0]==querySearch[0]){
        searchResult = true;
      }
    
  res.render("pages/searchResult",{querySearch: querySearch[0], info:database[0][1], searchResult:searchResult});
  })
  .catch((err)=>{
    console.error(err);
  });
  


});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});

