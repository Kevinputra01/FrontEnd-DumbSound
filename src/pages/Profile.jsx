import React, { useContext, useState } from "react";
import ProfilePic from "../assets/img/ava.png";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const [state] = useContext(UserContext);
  const title = "Profile";
  document.title = title + " | DumbSound";

  return (
    <>
      <div className="container-fluid vh-100 py-5 d-flex justify-content-center">
        {/* user info */}
        <div className="col-6">
          <h3 className="mb-4 fw-bold text-orange">My Profile</h3>
          <div className="d-flex justify-content-start">
            <div className="col-6">
              <img src={process.env.REACT_APP_FILE_PATH + state.user.image || ProfilePic} alt="profile" width="300px" className="rounded" />
            </div>
            <div className="col-6">
              <div className="info">
                <h5 className="text-orange fw-bold">Full Name</h5>
                <p className="text-profile">{state.user.fullname}</p>
              </div>
              <div className="info">
                <h5 className="text-orange fw-bold">Email</h5>
                <p className="text-profile">{state.user.email}</p>
              </div>
              <div className="info">
                <h5 className="text-orange fw-bold">Gender</h5>
                <p className="text-profile">{state.user.gender}</p>
              </div>
              <div className="info">
                <h5 className="text-orange fw-bold">Phone</h5>
                <p className="text-profile">{state.user.phone}</p>
              </div>
              <div className="info">
                <h5 className="text-orange fw-bold">Address</h5>
                <p className="text-profile">{state.user.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 text-end">
          <Link to="/edit-profile" className="btn btn-orange pt-2 me-1">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
}
