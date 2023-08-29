import { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import axiosInstance from "../../api/axios";
import { getRecentInventory, getTotalInOutdata } from "../../api/endPoints";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [recentInventory, setRecentInventory] = useState([]);
  console.log("recentInventory>>>>", recentInventory);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];
  // Get Blood Data
  const bloodGroupData = async () => {
    try {
      const { data } = await axiosInstance.get(getTotalInOutdata);
      if (data?.success) {
        setData(data?.bloodGroupsData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    bloodGroupData();
  }, []);

  // Get Recent Inventory
  const getRecentInventoryData = async () => {
    try {
      const { data } = await axiosInstance.get(getRecentInventory);
      if (data?.success) {
        setRecentInventory(data.inventory);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getRecentInventoryData();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap justify-content-center ">
        {data?.map((records, i) => {
          return (
            <div
              className="card m-2 p-1"
              key={i}
              style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body">
                <h5 className="card-title bg-light text-dark text-center mb-3">
                  {records.bloodGroup}
                </h5>
                <p className="card-text">
                  Total In:<b> {records.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out:<b> {records.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available:<b> {records.availabelBlood}</b> (ML)
              </div>
            </div>
          );
        })}
      </div>
      <div className="container mt-3">
        <h1 className="text-center ">Recent Blood Transition</h1>
        <table className="table">
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
            {recentInventory?.map((records) => {
              return (
                <tr key={records._id}>
                  <td>{records.bloodGroup}</td>
                  <td>
                    {records.inventoryType.charAt(0).toUpperCase() +
                      records.inventoryType?.slice(1)}
                  </td>
                  <td>{records.quantity} (ML)</td>
                  <td>
                    {records?.email}
                    {records?.hospital?.email}
                  </td>
                  <td>
                    {moment(records.createdAt).format("DD/MM/yyyy,h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Analytics;
