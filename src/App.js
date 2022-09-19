import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import NavBar from "../src/Components/Common/Navbar";
import SignIn from "../src/Components/SignUp-SignIn/SignIn";
import SignUp from "../src/Components/SignUp-SignIn/SignUP";
import Home from "../src/Components/Common/Home";
import UserListView from "./Components/List/UserListView";
import AllList from "./Components/List/AllList";
import './App.css';
import './index.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <NavBar />
          <div className="auth-wrapper">
            <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Home" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/UserListView" element={<UserListView />} />
                <Route path="/Market" element={<AllList />} />

              </Routes>
            </div>
          </div>
        </div>
      </Router>

    </React.Fragment>
  );
}

export default App;
