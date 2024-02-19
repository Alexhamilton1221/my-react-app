const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Good Connection");
  }
);

// db.run(`CREATE TABLE IF NOT EXISTS Student (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT
// )`);

// // Create Course table
// db.run(`CREATE TABLE IF NOT EXISTS Course (
//     course_name TEXT,
//     department TEXT,
//     time_of_day TEXT
// )`);
// Insert Student data
// db.run(
//   `INSERT INTO Student (name, email) VALUES
//         ('Alice Smith', 'alice@example.com'),
//         ('Bob Johnson', 'bob@example.com'),
//         ('Charlie Brown', 'charlie@example.com')`,
//   (err) => {
//     if (err) {
//       console.error("Error inserting students:", err.message);
//     } else {
//       console.log("Students inserted successfully");
//     }
//   }
// );

// // Insert Course data
// db.run(
//   `INSERT INTO Course (course_name, department, time_of_day) VALUES
//         ('Mathematics', 'Math', 'Morning'),
//         ('English Literature', 'English', 'Afternoon'),
//         ('Computer Science', 'Computer Science', 'Evening')`,
//   (err) => {
//     if (err) {
//       console.error("Error inserting courses:", err.message);
//     } else {
//       console.log("Courses inserted successfully");
//     }
//   }
// );
// // Select all students
db.all(`SELECT * FROM Student`, (err, rows) => {
  if (err) {
    console.error("Error retrieving students:", err.message);
  } else {
    console.log("Students:");
    rows.forEach((row) => {
      console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
    });
  }
});

// // Select all courses
// db.all(`SELECT * FROM Course`, (err, rows) => {
//   if (err) {
//     console.error("Error retrieving courses:", err.message);
//   } else {
//     console.log("Courses:");
//     rows.forEach((row) => {
//       console.log(
//         `ID: ${row.id}, Course Name: ${row.course_name}, Department: ${row.department}, Time of Day: ${row.time_of_day}`
//       );
//     });
//   }
// });

db.close((err) => {
  if (err) return console.error(err.message);
});
