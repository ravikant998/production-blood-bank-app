import { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import axiosInstance from "../../api/axios";
import { hospitalDataList } from "../../api/endPoints";
import moment from "moment";

const Hospital = () => {
  const [dataHospital, setDataHospital] = useState();
  const getHospital = async () => {
    try {
      const { data } = await axiosInstance.get(hospitalDataList);
      if (data?.success) {
        setDataHospital(data?.hospitals);
      }
    } catch (error) {
        
      console.log("error", error);
    }
  };
  useEffect(() => {
    getHospital();
  },[]);

  return (
    <>
      <Layout>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col" >  Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col"> Date</th>
            </tr>
          </thead>
          <tbody>
            {dataHospital?.map((records) => {

              return (
                <tr key={records._id}>
                  <td>{records.organisationName}</td>
                  <td>{records.email}</td>
                  <td>{records.phone}</td>
                  <td>{records.address}</td>

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
      </Layout>
    </>
  );
};
export default Hospital;
