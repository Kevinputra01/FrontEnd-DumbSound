import React, { useEffect, useState } from "react";
import { Button, Table, Alert, Modal } from "react-bootstrap";
import { API } from "../config/api";
import { useHistory } from "react-router-dom";

export default function ListMusic() {
  const title = "List Musics";
  document.title = title + " | DumbSound";
  const history = useHistory();
  const [musics, setMusics] = useState([]);
  const getMusics = async () => {
    try {
      const response = await API.get("/musics");
      setMusics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMusics();
  }, []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = () => setShowConfirmModal(true);

  const [alert, setAlert] = useState("");
  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/music/${id}`);
      console.log(response);
      handleCloseConfirmModal();
      history.push("/");
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Server Error</Alert>;
      setAlert(alert);
    }
  };

  return (
    <div className="vh-100 py-5 container">
      <h3 className="my-5 text-white">List Musics</h3>
      <Table striped bordered hover variant="dark" size="sm">
        <thead className="text-orange">
          <tr>
            <th>No</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Year</th>
            <th>Music File Name</th>
            <th>Artist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {musics.map((music, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td className="align-middle">
                  <img
                    src={process.env.REACT_APP_PATH_MUSIC + music.thumbnail}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{music.title}</td>
                <td>{music.year}</td>
                <td>{music.attache}</td>
                <td>{music.artist.name}</td>
                <td>
                    <Button variant="success" style={{ width: "100px" }}  >Edit</Button>
                    <Button variant="danger" style={{ width: "100px", marginTop: "10px" }} onClick={handleShowConfirmModal}> Delete</Button>
                </td>
                <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Finish Fund</Modal.Title>
                  </Modal.Header>
                  {alert && alert}
                  <Modal.Body className="fw-bold">Delete "{music.title}" Music?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                            handleDelete(music.id);
                          }}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
    </div>
  );
}
