import React, { useState, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import Icon1 from "../../assets/img/Logo.png";
import Icon2 from "../../assets/img/DUMBSOUND.png";

import ConditionalNavbar from "./ConditionalNavbar/ConditionalNavbar";
import LoginModal from "../Auth/Login";
import RegisterModal from "../Auth/Register";

export default function NavBar() {
  //handling logout
  const [state, dispatch] = useContext(UserContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: {} });
  };

  // modal register state
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  //modal login state
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  //props
  const conditionalNavbarProps = {
    handleShowLogin,
    handleShowRegister,
    isLogin: state.isLogin,
    handleLogout,
  };

  const loginModalProps = {
    showLogin,
    handleCloseLogin,
    handleShowRegister,
  };

  const registerModalProps = {
    showRegister,
    handleCloseRegister,
    handleShowLogin,
  };

  return (
    <>
      <Navbar expand="lg" sticky="top">
        <Container fluid className="text-light mx-5">
          <Link to="/">
            <img src={Icon1} alt="icon"  />
            <img src={Icon2} alt="Dumbsound" style={{ marginTop: -15 , marginLeft: 10 }} />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
            {state.isLogin}
            <ConditionalNavbar {...conditionalNavbarProps} />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* modal register and login */}
      <LoginModal {...loginModalProps} />
      <RegisterModal {...registerModalProps} />
    </>
  );
}
