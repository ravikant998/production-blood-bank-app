import { userRegister, userSignin } from "../redux/features/auth/authAction";
import store from "../redux/store";

export const handleSignin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please provide all fields");
    }
    store.dispatch(userSignin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};
export const handleRegistration = (
  e,
  name,
  role,
  email,
  password,
  organisationName,
  address,
  phone,
  website,
  hospitalName
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organisationName,
        address,
        phone,
        website,
        hospitalName,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
};
