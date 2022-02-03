import React, { useState, useEffect, useContext } from "react";
import { useHistory} from "react-router-dom";
import { Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

import { API } from "../config/api";

export default function EditProfile() {
  const [state] = useContext(UserContext);
  const title = "Edit Profile";
  document.title = title + " | DumbSound";
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    gender: "",
    phone: "",
    address: "",
    image: "",
  });
  console.log(form);

  const getUser = async () => {
    const { fullname, gender, phone, address, image } = state.user;
    setForm({
      fullname,  
      gender,
      phone,
      address,
      image,
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:  e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
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
      console.log(body);

      const response = await API.patch(`/user/${state.user.id}`, body, config);
      console.log(response);

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid vh-100 px-5 py-5">
        <Form className="container mb-5" onSubmit={handleSubmit}>
        <h4 className="mb-5 fw-bold" style={{ color:"#FFFFFF" }}>Edit Profile</h4>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
                className="mb-3"
                alt="preview"
              />
            </div>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <input type="text" className="form-control text-input" placeholder="Full Name" name="fullname" onChange={handleChange} value={form.fullname} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <label htmlFor="upload" className="btn text-input col-3 ms-1">
              Attache Photo Profile
            </label>
            <input type="file" id="upload" name="image" hidden onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Select aria-label="Default select example" className="text-input" name="gender" id={form.gender} onChange={handleChange}>
              <option style={{ color: "black" }} value="" disabled selected>Gender</option>
              <option style={{ color: "black" }} value="Male">Male</option>
              <option style={{ color: "black" }} value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <input type="number" className="form-control text-input" placeholder="Phone" name="phone" onChange={handleChange} value={form.phone} />
          </Form.Group>
          <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
            <textarea className="form-control text-input" rows={3} placeholder="Address" name="address" onChange={handleChange} value={form.address} style={{ resize: "none" }} />
          </Form.Group>
          <div className="d-flex">
                <button type="submit" className="btn btn-orange offset-4 col-4 mt-2">
                    Save
                </button>
            </div>
        </Form>
      </div>
    </>
  );
}
