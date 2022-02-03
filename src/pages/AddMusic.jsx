import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import { API } from "../config/api";

export default function AddMusic() {
    const title = "Add Music";
    document.title = title + " | DumbSound";

    const [listArtist, setListArtist] = useState([]);
    const getAllArtist = async () => {
        try {
        const response = await API.get("/artists");
        setListArtist(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getAllArtist();
    }, []);

    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        year: "",
        id_artist: "",
        attache: "",
    });

    // Handle change data on form
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    const history = useHistory();
    const handleSubmit = async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            "Content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.set("title", form.title);
        formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
        formData.set("year", form.year);
        formData.set("id_artist", form.id_artist);
        formData.set("attache", form.attache[0], form.attache[0].name);

        const response = await API.post("/add-music", formData, config);
        console.log(response);

        history.push("/list-music");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
        <div className="container-fluid vh-100 bg-dark px-5 py-5">
            <Form className="container mb-5" onSubmit={handleSubmit}>
            <h4 className="mb-5 fw-bold" style={{ color:"#FFFFFF" }}>Add Music</h4>
            <Form.Group className="mb-4 d-flex" controlId="exampleForm.ControlInput1">
                <input type="text" className="form-control text-input" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
                <label htmlFor="uploadThumbnail" className="btn text-input col-3 ms-1" >
                    Attache thumbnail
                </label>
                <input type="file" id="uploadThumbnail" name="thumbnail" hidden onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <input type="number" className="form-control text-input" placeholder="Year" name="year" value={form.year} onChange={handleChange}  />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <select className="form-control text-input" aria-label="Default select example" name="id_artist" defaultValue={form.id_artist} onChange={handleChange}>
                    <option style={{ color: "black" }} value="" disabled selected>Singer</option>
                    {listArtist.map((artist) => {
                        return <option style={{ color: "black" }} value={artist.id}>{artist.name}</option>;
                    })}
                </select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <label htmlFor="uploadMusic" className="btn btn-dark col-2 ms-1 text-input">
                    Attache
                </label>
                <input type="file" id="uploadMusic" name="attache" hidden onChange={handleChange} />
            </Form.Group>
            <div className="d-flex">
                <button type="submit" className="btn btn-orange offset-4 col-4 mt-2">
                    Add Song
                </button>
            </div>
            </Form>
        </div>
        </>
    );
}
