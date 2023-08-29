import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import image from "../../assests/images/banner.jpeg";
const SignIn = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-8 form-banner">
            <img src={image} alt="banner" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"SignIn page"}
              submitbtn={"SignIn"}
              formType={"signIn"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
