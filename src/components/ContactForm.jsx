import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Можна додати логіку відправки форми
  };

  return (
    <div className="container">
      <h2
        style={{
          fontWeight: "600px",
          fontSize: "72px",
          color: "white",
          textAlign: "center",
        }}
      >
        Contact Form
      </h2>
      <div
        style={{
          width: "650px",
          maxWidth: "100%",
          margin: "20px auto 25px auto",
          color: "white",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              style={{
                padding: "30px",
                border: "0",
                width: "100%",
                fontSize: "1rem",
                backgroundColor: "#2d2d2d",
                color: "white",
                borderRadius: "4px",
              }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              style={{
                padding: "30px",
                border: "0",
                width: "100%",
                fontSize: "1rem",
                backgroundColor: "#2d2d2d",
                color: "white",
                borderRadius: "4px",
              }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              style={{
                padding: "30px",
                border: "0",
                width: "100%",
                fontSize: "1rem",
                backgroundColor: "#2d2d2d",
                color: "white",
                borderRadius: "4px",
              }}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              style={{
                width: "100%",
                minHeight: "15em",
                padding: "30px",
                fontSize: "1rem",
                backgroundColor: "#2d2d2d",
                color: "white",
                borderRadius: "4px",
              }}
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              float: "right",
              padding: "7px 35px",
              borderRadius: "60px",
              display: "inline-block",
              backgroundColor: "#4b8cfb",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              boxShadow:
                "0 2px 5px 0 rgba(0,0,0,0.06) 0 2px 10px 0 rgba(0,0,0,0.07)",
              webkitTransition: "all 300ms ease",
              transition: "all 300ms ease",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
