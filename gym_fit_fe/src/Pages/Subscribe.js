import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subscribe.css';

function Subscribe() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  return (
    <div className="subscription-offers-page">
      <header className="subscription-header">
        <h1>Subscription Offers</h1>
        <p>Choose the plan that suits your fitness goals and lifestyle.</p>
      </header>

      <section className="subscription-plans">
        {subscriptions.map((subscription) => (
          <div className="subscription-plan" key={subscription.id}>
            <h2>{subscription.name}</h2>
            <p className="plan-price">${subscription.price}/month</p>
            <p className="plan-duration">Duration: {subscription.duration}</p>
            <p className="plan-description">{subscription.description}</p>
            <button className="plan-button">Choose Plan</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Subscribe;
