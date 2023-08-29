import moment from "moment";
import axiosInstance from "../api/axios";
import Layout from "../components/shared/Layout/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInventoryHospital } from "../api/endPoints";

const Donation = () => {
  const [data, setData] = useState([]);
  console.log("data>>>>",data)
  const { user } = useSelector((state) => state.auth);

  const getDonation = async () => {
    try {
      const { data } = await axiosInstance.post(getInventoryHospital, {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });

      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDonation();
  }, [user]);
  return (
    <>
      <Layout>
        <h3>Donation</h3>
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
            {data?.map((records) => {
              return (
                <tr key={records._id}>
                  <td>{records.bloodGroup}</td>
                  <td>
                    {records.inventoryType.charAt(0).toUpperCase() +
                      records.inventoryType?.slice(1)}
                  </td>
                  <td>{records.quantity} ML</td>
                  <td>{records.donar.email}</td>
                  <td>
                    {moment(records.createdAt).format("DD/MM/yyyy,h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    </>
  );
};
export default Donation;
