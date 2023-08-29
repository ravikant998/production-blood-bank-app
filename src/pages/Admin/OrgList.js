import { useState,useEffect } from "react";
import axiosInstance from "../../api/axios";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import { deleteDonar, getOrgListData } from "../../api/endPoints";


const OrgList=()=>{
    const [orgData, setOrgData] = useState([]);

    const getOrg = async () => {
      try {
        const { data } = await axiosInstance.get(getOrgListData);
        if (data?.success) {
            setOrgData(data?.orgData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    useEffect(() => {
        getOrg();
    }, []);
    const handleDelete = async (id) => {
        try {
          let answer = window.prompt("Do you want to delete this donar", "Sure");
          if(!answer) return
          const { data } = await axiosInstance.delete(`${deleteDonar}/${id}`);
         alert(data?.message)
         window.location.reload()
        } catch (error) {
          console.log("error", error);
        }
      };
  
    return (
      <>
        <Layout>
          <h1>Org page</h1>
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
              {orgData.map((records) => {
                return (
                  <tr key={records._id}>
                    <td>{records.organisationName}</td>
                    <td>{records.email}</td>
                    <td>{records.phone}</td>
                    <td>
                      {moment(records.createdAt).format("DD/MM/yyyy,h:mm:ss a")}
                    </td>
                    <td>
                    <div className="btn btn-danger" onClick={()=>handleDelete(records._id)}>
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Layout>
      </>
    );
}
export default OrgList