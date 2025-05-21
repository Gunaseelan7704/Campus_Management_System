import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us using the form below.</p>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Our Office</h2>
          <p><strong>Address:</strong> 123 Main Street, City, Country</p>
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Working Hours:</strong> Mon - Fri, 9 AM - 6 PM</p>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea placeholder="Write your message" rows="5" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
