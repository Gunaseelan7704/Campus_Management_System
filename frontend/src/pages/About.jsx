import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our platform! We are dedicated to providing top-notch solutions to our users.
      </p>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to revolutionize the way people interact with technology by delivering innovative solutions that enhance efficiency and user experience.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a future where technology empowers individuals and businesses to achieve their full potential seamlessly.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✅ High-quality services</li>
            <li>✅ Experienced team</li>
            <li>✅ Customer-focused approach</li>
            <li>✅ Cutting-edge technology</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
