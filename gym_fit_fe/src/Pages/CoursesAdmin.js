import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursesAdmin.css';

function CoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    id: 0,
    name: '',
    description: '',
    duration: 0,
    capacity: 0,
    subscriptionId: 0,
    subscription: {
      id: 0,
      name: '',
      price: 0,
      description: '',
      duration: ''
    },
    trainerId: 0,
    trainer: {
      id: 0,
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
      name: '',
      lastName: '',
      age: 0,
      experience: 0,
      photo: '',
      description: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('subscription.')) {
      const key = name.split('.')[1];
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        subscription: { ...prevCourse.subscription, [key]: value },
      }));
    } else if (name.startsWith('trainer.')) {
      const key = name.split('.')[1];
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        trainer: { ...prevCourse.trainer, [key]: value },
      }));
    } else {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7114/api/Courses', newCourse);
      fetchCourses();
      resetForm();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setNewCourse(course);
    setIsEditing(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7114/api/Courses/${newCourse.id}`, newCourse);
      fetchCourses();
      resetForm();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`https://localhost:7114/api/Courses/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const resetForm = () => {
    setNewCourse({
      id: 0,
      name: '',
      description: '',
      duration: 0,
      capacity: 0,
      subscriptionId: 0,
      subscription: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        duration: ''
      },
      trainerId: 0,
      trainer: {
        id: 0,
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
        name: '',
        lastName: '',
        age: 0,
        experience: 0,
        photo: '',
        description: ''
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>Manage Courses</h1>
        <p>Administer your courses, assign trainers, and set subscriptions.</p>
      </header>

      <section className="courses-list">
        {courses.map((course) => (
          <div className="course" key={course.id}>
            <h3>{course.name}</h3>
            <p>Description: {course.description}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Capacity: {course.capacity}</p>
            <p>Subscription Name: {course.subscription ? course.subscription.name : "N/A"}</p>
            <p>Subscription Price: {course.subscription ? `$${course.subscription.price}` : "N/A"}</p>
            <p>Trainer Name: {course.trainer ? `${course.trainer.name} ${course.trainer.lastName}` : "N/A"}</p>
            <p>Trainer Role: {course.trainer ? course.trainer.role : "N/A"}</p>
            <p>Trainer Phone: {course.trainer ? course.trainer.phoneNumber : "N/A"}</p>
            <img src={course.trainer ? course.trainer.photo : ""} alt="Trainer" className="trainer-photo" />
            <button onClick={() => handleEditCourse(course)}>Edit</button>
            <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="add-course">
        <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={isEditing ? handleUpdateCourse : handleAddCourse}>
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (hours)"
            value={newCourse.duration}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={newCourse.capacity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="subscription.id"
            placeholder="Subscription ID"
            value={newCourse.subscription.id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="subscription.name"
            placeholder="Subscription Name"
            value={newCourse.subscription.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="subscription.price"
            placeholder="Subscription Price"
            value={newCourse.subscription.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="subscription.description"
            placeholder="Subscription Description"
            value={newCourse.subscription.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="trainer.id"
            placeholder="Trainer ID"
            value={newCourse.trainer.id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="trainer.name"
            placeholder="Trainer First Name"
            value={newCourse.trainer.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.lastName"
            placeholder="Trainer Last Name"
            value={newCourse.trainer.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.role"
            placeholder="Trainer Role"
            value={newCourse.trainer.role}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.email"
            placeholder="Trainer Email"
            value={newCourse.trainer.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="trainer.password"
            placeholder="Trainer Password"
            value={newCourse.trainer.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.phoneNumber"
            placeholder="Trainer Phone Number"
            value={newCourse.trainer.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.photo"
            placeholder="Trainer Photo URL"
            value={newCourse.trainer.photo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.age"
            placeholder="Age"
            value={newCourse.trainer.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trainer.experience"
            placeholder="Trainer Photo URL"
            value={newCourse.trainer.experience}
            onChange={handleInputChange}
          />
          <textarea
            name="trainer.description"
            placeholder="Trainer Description"
            value={newCourse.trainer.description}
            onChange={handleInputChange}
          />
          <button type="submit">{isEditing ? 'Update Course' : 'Add Course'}</button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </section>
    </div>
  );
}

export default CoursesAdmin;
