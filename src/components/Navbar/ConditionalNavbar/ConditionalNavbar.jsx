import React, { useContext } from "react";
import { NavDropdown, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Ava from "../../../assets/img/ava.png";
import Polygon from "../../../assets/img/Polygon.png";
import PayIcon from "../../../assets/img/pay.png";
import LogoutIcon from "../../../assets/img/logouticon.png";
import addmusic from "../../../assets/img/music.png";
import addartist from "../../../assets/img/artist.png";

import "./ConditionalNavbar.css";
import { UserContext } from "../../../context/UserContext";

export default function ConditionalNavbar(props) {
  const [state] = useContext(UserContext);
  return (
    <div>
      {props.isLogin ? (
        Boolean(state.user.status) === false ? (
          <>
            <NavDropdown menuVariant="dark" align="end" title={<img src={Ava} width="50px" height="50px" alt="" className="rounded-circle" />} id="dropdown-menu-align-end">
              <img src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", left: "80%", width: "30px" }} />
              <Link className="fw-bold my-2 dropdown-item" to="/pay">
                <img src={PayIcon} className="me-2" alt="ico" /> Pay
              </Link>
              <Link className="fw-bold my-2 dropdown-item" to="/profile">
                <img src={PayIcon} className="me-2" alt="ico" /> Profile
              </Link>
              <NavDropdown.Divider className="bg-light" />
              <Link className="fw-bold my-2 dropdown-item" to="/" onClick={props.handleLogout}>
                <img src={LogoutIcon} className="me-2" alt="ico" /> Logout
              </Link>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav>
              <Nav.Link as={Link} to="/list-trans" className="text-orange fw-bold mt-2 me-2" style={{ fontSize: "20px" }}>Transactions</Nav.Link>
              <Nav.Link as={Link} to="/list-music" className="text-orange fw-bold mt-2 me-2" style={{ fontSize: "20px" }}>Musics</Nav.Link>
              <NavDropdown menuVariant="dark" align="end" title={<img src={Ava} width="50px" height="50px" alt="" className="rounded-circle" />} id="dropdown-menu-align-end">
                <img src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", left: "80%", width: "30px" }} />
                <Link className="fw-bold my-2 dropdown-item" to="/add-music">
                  <img src={addmusic} className="me-2" alt="ico" /> Add Music
                </Link>
                <Link className="fw-bold my-2 dropdown-item" to="/add-artist">
                  <img src={addartist} className="me-2" alt="ico" /> Add Artist
                </Link>
                <NavDropdown.Divider className="bg-light" />
                <Link className="fw-bold my-2 dropdown-item" to="/" onClick={props.handleLogout}>
                  <img src={LogoutIcon} className="me-2" alt="ico" /> Logout
                </Link>
              </NavDropdown>
            </Nav>
          </>
        )
      ) : (
        <>
          <Button variant="dark" onClick={props.handleShowLogin} className="me-2 px-3">
            Login
          </Button>
          <Button variant="danger" onClick={props.handleShowRegister} className="me-2">
            Register
          </Button>
        </>
      )}
    </div>
  );
}
