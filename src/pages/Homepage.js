import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import axiosInstance from "../api/axios";
import { getinventoryData } from "../api/endPoints";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // get function ///
  const getBloodRecords = async () => {
    try {
      const { data } = await axiosInstance.get(getinventoryData);
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <>
      <Layout>
        {user?.role === "admin" && navigate("/admin")}
        {error && <span>{alert(error)}</span>}
        {loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success"></i>
              Add Inventory
            </h4>
            <table className="table container">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory type</th>
                  <th scope="col">Quanitity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time or Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((records) => {
                  // console.log("records>>>>",records)
                  return (
                    <tr key={records._id}>
                      <td>{records.bloodGroup}</td>
                      <td>
                        {records.inventoryType.charAt(0).toUpperCase() +
                          records.inventoryType?.slice(1)}
                      </td>
                      <td>{records.quantity} ML</td>
                      <td>
                        {records?.donar?.email}
                        {records?.hospital?.email}{" "}
                      </td>
                      <td>
                        {moment(records.createdAt).format(
                          "DD/MM/yyyy,h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal />
          </div>
        )}
      </Layout>
    </>
  );
};

export default Homepage;
