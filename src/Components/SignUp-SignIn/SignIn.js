import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../Config/Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/user';

/**
 * @description: To display Login in or sign in page details
 * @return:sign in or login page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: SignIn.js
*/
function SignIn() {
    const dispatch = useDispatch();

    //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    //To capture the basic empty validation errors 
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (error) {
            alert("error!");
        }
        if (user) {
            navigate("/Home");
            dispatch(setUserName(email));
        }
    }, [user, loading, error]);

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

    return (
        <React.Fragment>
            <form onSubmit={submitForm}>
                <div className='auth-inner'>
                    <small className="error">{errors}</small>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="text"
                            value={email}
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary"
                            onClick={() => { if (!errors) logInWithEmailAndPassword(email, password) }}>
                            Login
                        </button>
                    </div>
                    <div className="forgot-password">
                        Don't have an account? <Link to="/sign-up">Sign Up</Link> now.
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default SignIn;
