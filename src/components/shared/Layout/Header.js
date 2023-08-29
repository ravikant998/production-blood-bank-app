import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  let roleData =
    user?.role || user?.hospital || user?.organisation || user?.admin;
  let userData = roleData?.charAt(0).toUpperCase() + roleData?.slice(1);

  const logOut = () => {
    localStorage.clear();
    toast.success("Logout successfully");
    Navigate("/signin");
  };
  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand">
            <BiDonateBlood color="red" /> Blood Bank app
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle />
                Welcome {user?.name} &nbsp;
                <span className="badge bg-secondary">{userData}</span>
              </p>
            </li>
            {(location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital" )? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">analytics</Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">Home</Link>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
