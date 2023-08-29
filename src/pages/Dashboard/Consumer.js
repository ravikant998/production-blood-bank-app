import moment from "moment";
import { getInventoryHospital } from "../../api/endPoints";
import Layout from "../../components/shared/Layout/Layout";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Consumer = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getData = async () => {
    try {
      const { data } = await axiosInstance.post(getInventoryHospital, {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
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
    getData();
  }, []);
  return (
    <>
      <Layout>
        <h3>Consumer</h3>
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
              // console.log("records>>>",records)
              return (
                <tr key={records._id}>
                  <td>{records.bloodGroup}</td>
                  <td>
                    {records.inventoryType.charAt(0).toUpperCase() +
                      records.inventoryType?.slice(1)}
                  </td>
                  <td>{records.quantity} ML</td>
                  <td>{records.hospital?.email}</td>
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
export default Consumer;
