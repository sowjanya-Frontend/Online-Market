import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../Config/Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../store/user';
import { useAlert } from "react-alert";

/**
 * @description: To display Login in or sign in page details
 * @return:sign in or login page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: SignIn.js
*/
function SignIn() {
    const alert = useAlert();
    const dispatch = useDispatch();

    //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/Home");
            dispatch(setUserName(email));
        }
    }, [user, loading]);

    return (
        <React.Fragment>
            <div className='auth-inner'>
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
                        onClick={() => logInWithEmailAndPassword(email, password)}>
                        Login
                    </button>
                </div>
                <div className="forgot-password">
                    Don't have an account? <Link to="/sign-up">Sign Up</Link> now.
                </div>
            </div>
        </React.Fragment>
    );
}

export default SignIn;
