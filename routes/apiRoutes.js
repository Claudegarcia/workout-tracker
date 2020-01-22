const db = require("../models");

module.exports = function (app){

        app.get("/api/workouts", (req, res) => {
            db.Workout.find({})
            .then(function (workout){
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
        });
        
        app.put("/api/workouts/:id", ({body}, res) => {
            const workoutId = body.params.id;
            
            db.Workout.update({body})
            .then(function (dbWorkout){
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
        });
    
};