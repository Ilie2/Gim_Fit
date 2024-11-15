import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:7114/api/Courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>Our Courses</h1>
        <p>Explore our range of fitness courses designed to help you achieve your fitness goals.</p>
      </header>

      <section className="courses-list">
        {courses.map(course => (
          <div className="course" key={course.id}>
            <h2>{course.name}</h2>
            <p className="course-description">{course.description}</p>
            <p className="course-duration">Duration: {course.duration} weeks</p>
            <p className="course-capacity">Capacity: {course.capacity} participants</p>
            <p className="course-subscription">Subscription ID: {course.subscriptionId}</p>
            <p className="course-trainer">Trainer ID: {course.trainerId}</p>
            <button className="course-button">Enroll Now</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Courses;
