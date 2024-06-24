import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login({run}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  function handleChange(event){
    setCredentials(prev=>{
        return {...prev, [event.target.name]: event.target.value};
    })
  }
  const navigate=useNavigate()
  let json={}
  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response=await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });
        json=await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken)
            alert("Login Successful")
            navigate("/")
            run();
        }
        else
        {
            alert("Login with correct credentials")
        }
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="loginHeading">Login</h2>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="on"
        />
      </div>
      <button type="submit" className="btn btn-primary" >
        Login
      </button>
    </form>
  );
}
