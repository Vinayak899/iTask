import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    setNewUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  }
  const navigate=useNavigate();
  async function createNewUser(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        alert("Login Successful");
        navigate("/");
      } else {
        alert("Login with correct credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={createNewUser}>
      <div className="form-group">
        <h2 className="loginHeading">Sign Up</h2>
        <label htmlFor="email">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        SignUp
      </button>
    </form>
  );
}
