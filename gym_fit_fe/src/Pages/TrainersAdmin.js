import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainersAdemin.css';

function TrainersAdmin() {
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
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
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prevTrainer) => ({
      ...prevTrainer,
      [name]: value,
    }));
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7114/api/Trainers', newTrainer);
      fetchTrainers();
      resetForm();
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  const handleEditTrainer = (trainer) => {
    setNewTrainer(trainer);
    setIsEditing(true);
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7114/api/Trainers/${newTrainer.id}`, newTrainer);
      fetchTrainers();
      resetForm();
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await axios.delete(`https://localhost:7114/api/Trainers/${id}`);
        fetchTrainers();
      } catch (error) {
        console.error('Error deleting trainer:', error);
      }
    }
  };

  const resetForm = () => {
    setNewTrainer({
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
    });
    setIsEditing(false);
  };

  return (
    <div className="trainers-page">
      <header className="trainers-header">
        <h1>Meet Our Trainers</h1>
        <p>Our professional trainers are here to help you achieve your fitness goals.</p>
      </header>

      <section className="trainers-list">
        {trainers.map((trainer) => (
          <div className="trainer" key={trainer.id}>
            <img src={trainer.photo} alt={`${trainer.name} ${trainer.lastName}`} />
            <h3>{trainer.name} {trainer.lastName}</h3>
            <p>Specialty: {trainer.role}</p>
            <p>Bio: {trainer.description}</p>
            <p>Email: {trainer.email}</p>
            <p>Phone: {trainer.phoneNumber}</p>
            <p>Age: {trainer.age}</p>
            <p>Experience: {trainer.experience} years</p>
            <button onClick={() => handleEditTrainer(trainer)}>Edit</button>
            <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="add-trainer">
        <h2>{isEditing ? 'Edit Trainer' : 'Add New Trainer'}</h2>
        <form onSubmit={isEditing ? handleUpdateTrainer : handleAddTrainer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newTrainer.email}
            onChange={handleInputChange}
            required
          />
          {!isEditing && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newTrainer.password}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newTrainer.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newTrainer.role}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={newTrainer.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newTrainer.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newTrainer.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={newTrainer.experience}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={newTrainer.photo}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTrainer.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Trainer' : 'Add Trainer'}</button>
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

export default TrainersAdmin;
