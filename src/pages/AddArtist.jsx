import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import { API } from "../config/api";

export default function AddArtist() {
    const title = "Add Artist";
    document.title = title + " | DumbSound";
    const [form, setForm] = useState({
        name: "",
        old: "",
        tipe: "",
        career: "",
    });

    // Handle change data on form
    const { name, old, tipe, career } = form;
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const history = useHistory();
    const handleSubmit = async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };

        const body = JSON.stringify(form);
        const response = await API.post("/add-artist", body, config);
        console.log(response);
        setForm({
            name: "",
            old: "",
            tipe: "",
            career: "",
        });

        history.push("/add-music");
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <>
        <div className="container-fluid vh-100 bg-dark px-5 py-5">
            <Form className="container mb-5" onSubmit={handleSubmit}>
            <h4 className="mb-5 fw-bold" style={{ color:"#FFFFFF" }} >Add Artist</h4>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <input type="text" className="form-control text-input" placeholder="Name" name="name" value={name} onChange={handleChange}  />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <input type="number" className="form-control text-input" placeholder="Old" name="old" value={old} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Select aria-label="Default select example" className="text-input" name="tipe" id={tipe} onChange={handleChange}>
                    <option style={{ color: "black" }} value="" disabled selected>Type</option>
                    <option style={{ color: "black" }} value="Solo">Solo</option>
                    <option style={{ color: "black" }} value="Duo">Duo</option>
                    <option style={{ color: "black" }} value="Group">Group</option>
                    <option style={{ color: "black" }} value="Band">Band</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                <input type="number" className="form-control text-input" placeholder="Start a Career" name="career" value={career} onChange={handleChange} />
            </Form.Group>
            <div className="d-flex">
                <button type="submit" className="btn btn-orange offset-4 col-4">
                Add Artist
                </button>
            </div>
            </Form>
        </div>
        </>
    );
}
