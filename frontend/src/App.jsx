import { BrowserRouter as Router, Routes, Route   } from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Login";
import Registration from "./components/Registration";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import DisasterMap from "./components/DisasterMap";
import VolunteerCoordination from "./components/VolunteerCoordination";
import AboutUs from "./components/AboutUs";
import SMSAlertsDummy from "./components/SMSAlertsDummy";
import ReliefManagement from "./components/ReliefManagement";
import LiveLocationMap from "./components/LiveLocationMap";
import Footer from "./components/Footer";



export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/navbar" element={<Navbar />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/disastermap" element={<DisasterMap />} />
          <Route path="/volunteer" element={<VolunteerCoordination />} />
          <Route path="/smsalert" element={<SMSAlertsDummy />} />
          <Route path="/relief" element={<ReliefManagement />} />
          <Route path="/livelocation" element={ <LiveLocationMap />} />
          <Route path="/footer" element={ <Footer />} />
               
    </Routes>
    
      </Router>
      
    </>
  );
}
