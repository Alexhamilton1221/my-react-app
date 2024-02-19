const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

// Create a new SQLite database connection
const db = new sqlite3.Database(
  "../javascript_database/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

// Define a new endpoint to fetch student data
app.get("/students", (req, res) => {
  const query = "SELECT * FROM Student";
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving students:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(rows); // Send the student data in the response
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
