import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);
    // Додайте логіку аутентифікації
  };

  return (
    <div>
      <h2
        style={{
          fontWeight: "600px",
          fontSize: "72px",
          color: "white",
          textAlign: "center",
        }}
      >
        Login
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
            <label>Password:</label>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
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
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
