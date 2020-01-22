//html routes

// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

module.exports = function(app) {
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/exercise?", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};