import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import defaultuserImage from '../../Images/DefaultUserIcon.jpg';
import { useSelector } from 'react-redux';
import { logout } from "../../Config/Firebase";
import { loggedInuserName } from "../store/user";

/**
 * @description: To display Nav bar all pages
 * @return:Navigation bar to header part page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: Navbar.js
*/
function NavBar() {
    //TO get the loggedIn user name
    const userName = useSelector(loggedInuserName);

    //TO show the User profile image or loggedIn user email condition based
    const userProfile = () => {
        if (!userName) {
            return <div className="nav-item dropdown cursor-auto" title={userName}>
                <img src={defaultuserImage} className="UserImg" alt="UserImg" width="40" height="40" />
            </div>
        }
        else {
            return <div className="nav-item dropdown cursor-auto" title={userName}>
                <div className="user-email">{userName}</div>
            </div>
        }
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Link className="navbar-brand" to={'/Home'}>
                        Online Market
                    </Link>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/sign-in'}>
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/Home'}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/UserListView'}>
                                    MyItems
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/Market'}>
                                    AllItems
                                </Link>
                            </li>
                            <li className="d-flex justify-content-end nav-bar-right">

                                {userProfile()}

                                <button className="btn btn-default" type="button" onClick={() => logout()}>LogOut</button>
                            </li>
                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}
export default NavBar;