/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  movie = req.body.genres;
  movies = movie.split(", ")
  console.log(movies);
  res.render("pages/index2", {movies: movies})
});


app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
      if(movie1 == undefined || movie2 == undefined) {
      res.send("<p>Please don't leave movie blank!!</p>");
      } else {
      res.send(`${movie1} ${movie2}`);
      res.render("pages/index2", {movie1: movie1, movie2: movie2} )

    }
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});

