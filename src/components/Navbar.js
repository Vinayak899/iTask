import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const host = "http://localhost:5000";
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        if (!localStorage.getItem("token")) {
          navigate("/login");
        } else {
          const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
          const user = await response.json();
          setUser(user.name);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [localStorage.getItem("token")]);
  function deleteToken() {
    localStorage.removeItem("token");
  }
  function handleClick() {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav">
      <Link className="navbar-brand" to="/" onClick={handleClick}>
        iNotebook
      </Link>
      <div className="login">
        {!localStorage.getItem("token") ? (
          <>
            <Link type="button" className="btn btn-primary mx-2" to="/login">
              Login
            </Link>
            <Link type="button" className="btn btn-primary mx-2" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <h5 className="userName">{user}</h5>
            <Link
              type="button"
              className="btn btn-primary mx-2"
              to="/login"
              onClick={deleteToken}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
