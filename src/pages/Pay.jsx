import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import icon from "../assets/img/attache.png";

import { API } from "../config/api";

export default function Pay() {
  const title = "Payment";
  document.title = title + " | DumbSound";
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("attache", form.image[0], form.image.name);
      formData.set("status", "pending");

      const response = await API.post("/add-payment", formData, config);
      console.log(response);
      if (response.data.status === "success") {
        setMessage(
          <Alert variant="success" className="w-50 offset-3">
            Success upload Payment
          </Alert>
        );
      } else if (response.data.status === "error") {
        const alert = (
          <Alert variant="danger" className="w-50 offset-3">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-white vh-100 container text-center pt-5">
      <h2 className="mb-4 fw-bold">Premium</h2>
      <p>
        Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="text-orange">DUMB</span>SOUND{" "}
      </p>
      <p>
        <span className="text-orange">DUMB</span>SOUND : 0981312323
      </p>
      {message}
      <Form className="col-4 offset-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Input your account number" className="text-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <label disabled htmlFor="upload" className="form-control text-start text-orange" style={{ backgroundColor: "#161616", border: "2px solid white"}}>
            Attache proof of transfer
            <img src={icon} alt="icon" style={{ marginLeft: "120px", marginRight: "-20px" }}/>
          </label>
          <input type="file" id="upload" name="image" hidden onChange={handleChange} />
        </Form.Group>
        {preview && (
          <div>
            <img
              src={preview}
              style={{
                maxWidth: "375px",
                maxHeight: "375px",
                objectFit: "cover",
              }}
              className="mb-3"
              alt="preview"
            />
          </div>
        )}
        <button type="submit" className="btn-orange w-100 mt-4">
          Send
        </button>
      </Form>
    </div>
  );
}
