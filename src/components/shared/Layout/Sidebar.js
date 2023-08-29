import { Link, useLocation } from "react-router-dom";
import "../../../style/Layout.css";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="sidebar">
        <div className="menu">
          {user?.role == "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse">
                  <Link to="/" style={{ marginLeft: "10px" }}>
                    Inventory
                  </Link>
                </i>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical">
                  <Link to="/donar" style={{ marginLeft: "10px" }}>
                    Donar
                  </Link>
                </i>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital">
                  <Link to="/hospital" style={{ marginLeft: "10px" }}>
                    Hospital
                  </Link>
                </i>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/orgnisation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo">
                <Link to="/orgnisation" style={{ marginLeft: "10px" }}>
                  Orgnisation
                </Link>
              </i>
            </div>
          )}

          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo">
                <Link to="/consumer" style={{ marginLeft: "10px" }}>
                  Consumer
                </Link>
              </i>
            </div>
          )}

          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo">
                <Link to="/donation" style={{ marginLeft: "10px" }}>
                  Donation
                </Link>
              </i>
            </div>
          )}
          {user?.role == "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse">
                  <Link to="/donar-list" style={{ marginLeft: "10px" }}>
                    Donar List
                  </Link>
                </i>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical">
                  <Link to="/hospital-list" style={{ marginLeft: "10px" }}>
                    Hospital List
                  </Link>
                </i>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital">
                  <Link to="/org-list" style={{ marginLeft: "10px" }}>
                    Orgnisation List
                  </Link>
                </i>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
