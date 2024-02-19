import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseRegistration() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    // Fetch students
    axios
      .get("/api/students/")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));

    // Fetch courses
    axios
      .get("/api/courses/")
      .then((response) => {
        setCourses(response.data);
        setFilteredCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Handle student selection
  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Filter courses based on search term
    const filtered = courses.filter((course) =>
      course.time_of_day
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  // Enroll student in course
  const enrollStudent = (studentId, courseId) => {
    // Implement enroll functionality here
    console.log(`Enrolling student ${studentId} in course ${courseId}`);
  };

  return (
    <div>
      <h1>Course Registration</h1>

      <div className="sub-box">
        <h2>Course List</h2>
        <div>
          {/* Dropdown to select student */}
          <select value={selectedStudent} onChange={handleStudentChange}>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          {/* Search box to filter courses by time */}
          <input
            type="text"
            placeholder="Search by Time"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {/* Grid displaying courses */}
        <div className="course-grid">
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="course">
              <div>Course ID: {index + 1}</div>
              <div>Course Name: {course.course_name}</div>
              <div>Department: {course.department}</div>
              <div>Time of Day: {course.time_of_day}</div>
              <button onClick={() => enrollStudent(selectedStudent, course.id)}>
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
