import { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import axiosInstance from "../../api/axios";
import { donarDataList } from "../../api/endPoints";
import moment from "moment";

const Donar = () => {
  const [donarData, setDonarData] = useState([]);

  const getDonars = async () => {
    try {
      const { data } = await axiosInstance.get(donarDataList);
      if (data?.success) {
        setDonarData(data?.donars);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);


  return (
    <>
      <Layout>
        <h1>Donar page</h1>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col" >Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col"> Date</th>
            </tr>
          </thead>
          <tbody>
            {donarData.map((records) => {
              return (
                <tr key={records._id}>
                  <td>{records.hospitalName || records.organisationName|| records.name  }</td>
                  <td>{records.email}</td>
                  <td>{records.phone}</td>
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
export default Donar;
