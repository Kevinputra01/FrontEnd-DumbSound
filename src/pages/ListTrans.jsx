import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "react-bootstrap";

import Confirm from "../assets/img/Polygon 2.png";

import { API } from "../config/api";

export default function ListTrans() {
  const title = "List Trans";
  document.title = title + " | DumbSound";
  const [payments, setPayments] = useState([]);
  const getPayments = async () => {
    try {
      const response = await API.get("/payments");
      setPayments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const approvePayment = async (id) => {
    try {
      await API.patch(`/approvePayment/${id}`);
      getPayments();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectPayment = async (id) => {
    try {
      await API.patch(`/rejectPayment/${id}`);
      getPayments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 py-5 container">
      <h3 className="my-5 text-white">Incoming Transactions</h3>
      <Table striped bordered hover variant="dark" size="sm">
        <thead className="text-orange">
          <tr>
            <th>No</th>
            <th>Users</th>
            <th>Bukti Transfer</th>
            <th>Remaining Active</th>
            <th>Status User</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, i) => {
            const userStatus = {
              status: payment.status === "Approved" ? "Active" : "Not Active",
              className: payment.status === "Approved" ? "text-success" : "text-danger",
            };

            let paymentStatusStyle;
            if (payment.status === "Approved") {
              paymentStatusStyle = "text-success";
            } else if (payment.status === "Pending") {
              paymentStatusStyle = "text-warning";
            } else {
              paymentStatusStyle = "text-danger";
            }

            const dueDate = new Date(payment.dueDate);
            const startDate = new Date(payment.createdAt);
            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((dueDate - startDate) / oneDay));

            return (
              <tr>
                <td>{i + 1}</td>
                <td>{payment.userId.fullname}</td>
                <td>{payment.attache}</td>
                <td>{diffDays} Day's</td>
                <td className={userStatus.className}>{userStatus.status}</td>
                <td className={paymentStatusStyle}>{payment.status}</td>
                <td className="text-center">
                  <Dropdown>
                    <Dropdown.Toggle drop="end" key="end" id="dropdown-button-dark-example1" variant="dark">
                      <img src={Confirm} alt="icon" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item className="text-success" onClick={() => approvePayment(payment.id)}>
                        Approved
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={() => rejectPayment(payment.id)}>
                        Cancel
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
