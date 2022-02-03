import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

import LoginModal from "./Auth/Login";
import RegisterModal from "./Auth/Register";

export default function CardDonate(props) {
    const [state] = useContext(UserContext);

    // modal register state
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    //modal login state
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

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

    //cut description
    const cutDescription = (str) => {
        if (str.length > 5) {
            return (str = str.substring(0, 4) + "...");
        } else {
            return str;
        }
    };

    return (
        <div className="col-3 mt-5 ms-5" key={props.i}>
            {state.isLogin ? (
                <Card onClick={() => props.handleClickButton(props.donationId)} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={process.env.REACT_APP_PATH_FILE + props.thumbnail} alt="donation picture" />
                    <Card.Body>
                        <Card.Title>{cutDescription(props.title)}{props.year}</Card.Title>
                        <Card.Text>{props.id_artist}</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <Card onClick={() => props.handleClickButton(props.donationId)} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={process.env.REACT_APP_PATH_FILE + props.thumbnail} alt="donation picture" />
                    <Card.Body>
                        <Card.Title>{cutDescription(props.title)}</Card.Title>
                        <Card.Text>{props.artist}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        {/* modal register and login */}
        <LoginModal {...loginModalProps} />
        <RegisterModal {...registerModalProps} />
        </div>
    );
}

CardDonate.propTypes = {
    i: PropTypes.number.isRequired,
    donationPicture: PropTypes.string,
    donationName: PropTypes.string.isRequired,
    progress: PropTypes.number,
    buttonName: PropTypes.string,
};
