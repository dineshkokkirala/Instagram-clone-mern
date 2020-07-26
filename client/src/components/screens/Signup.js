import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">
          Register
        </button>
        <h6>
          <Link to="/login">Already have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
