import moment from "moment";
import Layout from "../../components/shared/Layout/Layout";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
  getOrgnaisationForHospital,
  getOrgnisationData,
} from "../../api/endPoints";
import { useSelector } from "react-redux";

const Orgnisation = () => {
  const [data, setData] = useState();
  const { user } = useSelector((state) => state.auth);
  
  const getorgnisation = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await axiosInstance.get(getOrgnisationData);
        if (data?.success) {
          setData(data.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await axiosInstance.get(getOrgnaisationForHospital);
        if (data?.success) {
          setData(data.organisations);
        }
      }
    } catch (error) {
      console.log("error,error");
    }
  };
  useEffect(() => {
    getorgnisation();
  }, [user]);
  return (
    <>
      <Layout>
      <h3>Organisation</h3>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col"> Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col"> Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((records) => {
              return (
                <tr key={records._id}>
                  <td>
                    {records.hospitalName.charAt(0).toUpperCase() +
                      records.hospitalName?.slice(1)}{records.organisationName.charAt(0).toUpperCase() +
                        records.organisationName?.slice(1)}{records.name.charAt(0).toUpperCase() +
                          records.name?.slice(1)}
                  </td>
                  <td>{records.email}</td>
                  <td>{records.phone}</td>
                  <td>{records.address}</td>

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
export default Orgnisation;
