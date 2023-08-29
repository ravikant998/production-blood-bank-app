import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import Registration from "./pages/auth/Registration";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Homepage from "./pages/Homepage";
import Donar from "./pages/Dashboard/Donar";
import Hospital from "./pages/Dashboard/Hospital";
import Orgnisation from "./pages/Dashboard/Orgnisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import OrgList from "./pages/Admin/OrgList";
import HospitalList from "./pages/Admin/HospitalList";
import AdminHome from "./pages/Admin/AdminHome";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgnisation"
          element={
            <ProtectedRoute>
              <Orgnisation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/donar-list" element={<ProtectedRoute><DonarList/></ProtectedRoute>}/>
        <Route path="/org-list" element={<ProtectedRoute><OrgList/></ProtectedRoute>}/>
        <Route path="/hospital-list" element={<ProtectedRoute><HospitalList/></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>

      </Routes>
    </>
  );
}

export default App;
