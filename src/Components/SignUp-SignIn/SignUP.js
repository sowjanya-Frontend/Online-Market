import React, { useState } from "react";
import { auth, registerWithEmailAndPassword } from "../../Config/Firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

/**
 * @description: To display sign Up page details
 * @return:sign up page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: SignUp.js
*/
function SignUp() {

  const alert = useAlert();

  const [userObj, setUser] = useState({});

  //To capture the basic empty validation errors 
  const [errors, setErrors] = useState("");

  //To handle the state change
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setRegisterEmail] = useState("");
  const [password, setRegisterPassword] = useState("");

  //To do the basic validation 
  const submitForm = (e) => {
    e.preventDefault();
    setErrors("");
    if (email === "") {
      setErrors("Email is mandatory field!");
    }
    else if (password === "") {
      setErrors("Password is mandatory field!");
    }
  }

  //To handle the signup
  const register = () => {
    const name = `${firstName} ${lastName}`;
    if (!name) alert("Please enter name");
    if (!errors) {
      registerWithEmailAndPassword(name, email, password);
      setFirstName("");
      setLastName("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={submitForm}>
        <div className='auth-inner'>
          <small className="error">{errors}</small>
          <h3>Sign Up <span>{userObj?.email}</span></h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input type="text" className="form-control" value={lastName} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}

            />
          </div>
          <div className="d-grid">
            <button onClick={register} className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="forgot-password text-right">
            Already registered <Link to="/sign-in">sign in?</Link>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}
export default SignUp;