const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
var path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethods", { useNewUrlParser: true });

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

//html routes
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


//api routes

//returns all workouts in db
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//returns all workouts in the db
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//creates new workout in the db
app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
  .then(newWorkout => {
    res.json(newWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})

//adds exercise to workout at workout id passed in url
//source https://docs.mongodb.com/manual/reference/operator/update/push/
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update({_id: req.params.id},{$push:{"exercises": req.body}})
  .then(updatedWorkout => {
    res.json(updatedWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
