import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Service from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./componets/Login";
import { Toaster } from "react-hot-toast";
import userStore from "./store/user";
import { Loader } from "lucide-react";
import ScrollToTop from "./componets/ScroollTop";
import Appointment from "./pages/Appointment";
import MechanicWork from "./pages/MechanicWork";
function App() {
  const [openAdminMenu, setOpenAdminMenu] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const { CheckAuth, checkAuth, user } = userStore();

  useEffect(() => {
    CheckAuth();
  }, []);
  useEffect(() => {
    if (user) {
      setOpenLogin(false);
    }
  }, [user]);

  if (checkAuth)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500">
        <Loader size={45} className="animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar setOpenAdminMenu={setOpenAdminMenu} showLogin={setOpenLogin} />
      {openLogin && <Login showLogin={setOpenLogin} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/appointment"
          element={user?.role === "customer" ? <Appointment /> : <Home />}
        />
        <Route
          path="/mechanic"
          element={user?.role === "mechanic" ? <MechanicWork /> : <Home />}
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admin
                openAdminMenu={openAdminMenu}
                setOpenAdminMenu={setOpenAdminMenu}
              />
            ) : (
              <Home />
            )
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
