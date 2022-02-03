import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//components
import NavBar from "./components/Navbar/NavBar";

// pages
import Home from "./pages/Home";
import Pay from "./pages/Pay";
import AddArtist from "./pages/AddArtist";
import AddMusic from "./pages/AddMusic";
import ListTrans from "./pages/ListTrans";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ListMusic from "./pages/ListMusic";

//context
import PrivateRoute from "./context/PrivateRoute";
import { UserContext } from "./context/UserContext";

import { API, setAuthToken } from "./config/api";

//check token in localstorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/pay" component={Pay} />
        <PrivateRoute exact path="/add-artist" component={AddArtist} />
        <PrivateRoute exact path="/add-music" component={AddMusic} />
        <PrivateRoute exact path="/list-trans" component={ListTrans} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/list-music" component={ListMusic} />
      </Switch>
    </Router>
  );
}

export default App;
