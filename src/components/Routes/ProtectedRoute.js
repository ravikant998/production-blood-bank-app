import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axios";
import { getCurrentUserData } from "../../api/endPoints";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/features/auth/authAction";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get(getCurrentUserData);
      if (data?.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};
export default ProtectedRoute;
