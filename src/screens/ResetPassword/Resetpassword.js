import React from "react";
import { Link } from "react-router-dom";

const Resetpassword = () => {
  return (
    <div>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div>or</div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>

        <p>
          Change password later?<Link to="/"> Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Resetpassword;
