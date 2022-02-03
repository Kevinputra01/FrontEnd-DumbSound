import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";

import { API } from "../config/api";
import { UserContext } from "../context/UserContext";

import LoginModal from "../../src/components/Auth/Login";
import RegisterModal from "../../src/components/Auth/Register";
import Player from "../components/PlayMusic";
import img from "../assets/img/Homebg.jpg";

export default function Home() {
  document.title = "DumbSound Let's Enjoy Listening Musics";

  const [musics, setMusics] = useState([]);
  const getAllMusic = async () => {
    try {
      const response = await API.get("/musics");
      setMusics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMusic();
  }, []);

  const [state] = useContext(UserContext);
  const [selectedMusic, setSelectedMusic] = useState(0);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  //modal login state
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const selectMusic = (index) => {
    if (state.isLogin) {
      setSelectedMusic(index);
    } else {
      handleShowLogin();
    }
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

  const cut = (str) => {
    if (str.length > 8) {
      return (str = str.substring(0, 7) + "...");
    } else {
      return str;
    }
  };

  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <img src={img} alt="img" />
        {/* card donate */}
        <div className="py-5 bg-dark">
          <h1 className="text-center text-danger fw-bold me-5">Dengarkan Dan Rasakan </h1>
          <div className="d-flex">
            {musics.map((msc, i) => {
              return (
                <Card onClick={() => selectMusic(i)} border="dark" className="rounded col-3 mt-3 ms-3" style={{ width: "12rem", backgroundColor: "#3A3A3A", cursor: "pointer", borderRadius: "10px" }}>
                  <Card.Img variant="top" src={process.env.REACT_APP_PATH_MUSIC + msc.thumbnail} alt="img" style={{ width: "190px", height: "190px", padding: "10px" }} />
                  <Card.Body className="text-white d-flex">
                    <div className="col-9">
                      <Card.Title>{cut(msc.title)}</Card.Title>
                      <Card.Text>{msc.artist.name}</Card.Text>
                    </div>
                    <div className="ms-2">
                      <Card.Text>{msc.year}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          {state.isLogin && <Player musics={musics} selectedMusicIndex={selectedMusic} />}

        <LoginModal {...loginModalProps} />
        <RegisterModal {...registerModalProps} />
        </div>
      </div>
    </>
  );
}
