import React, { useContext, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { API } from "../../config/api";

export default function LoginModal(props) {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      console.log(response);

      if (response.data.status === "success") {
        const alert = <Alert variant="success">Success</Alert>;
        setMessage(alert);

        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data.user });

        if (response.data.data.user.status === true) {
          history.push("/list-trans");
        } else {
          history.push("/");
        }

        setForm({
          email: "",
          password: "",
        });
        props.handleCloseLogin();
        setMessage(null);
      } else if (response.data.status === "error") {
        const alert = <Alert variant="danger">{response.data.message}</Alert>;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };
  return (
    <>
      <Modal size="sm" show={props.showLogin} onHide={props.handleCloseLogin} centered>
        <Modal.Header className="bg-black" closeButton>
          <Modal.Title className="fw-bold text-white">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black">
          {message && message}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input type="email" className="form-control text-input" placeholder="Email" name="email" value={email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <input type="password" className="form-control text-input" placeholder="Password" name="password" value={password} onChange={handleChange} />
            </Form.Group>
            <Button variant="danger" type="submit" className="col-12">
              Login
            </Button>
            <p className="mt-3 text-center text-secondary text-white">
              Don't have an account ? Click{" "}
              <span
                onClick={() => {
                  props.handleShowRegister();
                  props.handleCloseLogin();
                }}
                role="button"
                className="fw-bold text-dark text-decoration-none"
              >
                Here
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

LoginModal.propTypes = {
  showLogin: PropTypes.bool.isRequired,
  handleCloseLogin: PropTypes.func,
  handleShowRegister: PropTypes.func,
};
