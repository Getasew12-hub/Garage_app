import React, { use, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import userStore from "../store/user";

function Navbar({ setOpenAdminMenu, showLogin }) {
  const { user, LogoutUser } = userStore();
  const navigate = useNavigate();
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = React.useState(false);

  const admin = user?.role === "admin";
  const customer = user?.role === "customer";
  const mechanic = user?.role === "mechanic";
  const location = useLocation();
  const addminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    });
  });

  function handleMenu() {
    if (openMenu) {
      setOpenMenu(false);
    }
  }
  return (
    <div>
      <div
        className={`${addminPath ? "bg-black" : "bg-black/50"} px-4 py-1 flex justify-between items-center fixed top-0 w-full md:pt-3 xl:px-20 z-50`}
      >
        {/* dachboard menue */}
        {addminPath && (
          <Menu
            onClick={() => setOpenAdminMenu(true)}
            className="lg:hidden cursor-pointer  text-blue-400"
          />
        )}

        {/* logo */}

        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo2.png" alt="" className="h-10" />
          <span className="font-bold text-white font-serif  text-xl hidden md:block">
            Family Garage
          </span>
        </div>

        <div className="font-semibold text-white lg:flex hidden">
          <Link to="/" className="mr-4 hover:text-blue-400">
            Home
          </Link>
          <Link to="/service" className="mr-4 hover:text-blue-400">
            Service
          </Link>
          <Link to="/aboutus" className="mr-4 hover:text-blue-400">
            About us
          </Link>
          <Link to="/contact" className="mr-4 hover:text-blue-400">
            Contact
          </Link>
          {mechanic && (
            <Link to="/mechanic" className="mr-4 hover:text-blue-400">
              My Work
            </Link>
          )}
          {customer && (
            <Link to="/appointment" className="mr-4 hover:text-blue-400">
              Appointment
            </Link>
          )}
          {admin && (
            <Link
              to="/admin?path=dashboard"
              className="mr-4 hover:text-blue-400"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <button
              className="bg-blue-400 px-4 py-1 rounded-full cursor-pointer text-sm"
              onClick={() => showLogin(true)}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-gray-400 px-4 py-1 rounded-full cursor-pointer text-sm"
              onClick={LogoutUser}
            >
              Logout
            </button>
          )}
        </div>

        <Menu
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden cursor-pointer text-white"
        />
      </div>
      {/* mobile menu  */}

      <div
        ref={menuRef}
        className={`${openMenu ? "translate-x-0" : "translate-x-full"} transition-all duration-300  font-semibold text-white flex flex-col lg:hidden fixed top-0 right-0 w-2/3 max-w-96 h-screen bg-gray-700 px-4 py-1 pt-10 gap-4 z-50 border-l border-gray-400`}
      >
        <X
          className="absolute top-4 right-4 cursor-pointer w-fit"
          onClick={() => setOpenMenu(false)}
        />
        <Link
          to="/"
          className="mr-4 hover:text-blue-400 w-fit"
          onClick={handleMenu}
        >
          Home
        </Link>
        <Link
          to="/service"
          className="mr-4 hover:text-blue-400 w-fit"
          onClick={handleMenu}
        >
          Service
        </Link>
        <Link
          to="/aboutus"
          className="mr-4 hover:text-blue-400 w-fit"
          onClick={handleMenu}
        >
          About us
        </Link>
        <Link
          to="/contact"
          className="mr-4 hover:text-blue-400 w-fit"
          onClick={handleMenu}
        >
          Contact
        </Link>
        {mechanic && (
          <Link
            to="/mechanic"
            className="mr-4 hover:text-blue-400 w-fit"
            onClick={handleMenu}
          >
            My Work
          </Link>
        )}
        {customer && (
          <Link
            to="/appointment"
            className="mr-4 hover:text-blue-400"
            onClick={handleMenu}
          >
            Appointment
          </Link>
        )}
        {admin && (
          <Link
            to="/admin?path=dashboard"
            className="mr-4 hover:text-blue-400 w-fit"
            onClick={handleMenu}
          >
            Dashboard
          </Link>
        )}

        {!user ? (
          <button
            className="bg-blue-400 px-4 py-1 rounded-full cursor-pointer w-fit"
            onClick={() => {
              showLogin(true);
              handleMenu();
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="bg-gray-400 px-4 py-1 rounded-full cursor-pointer w-fit"
            onClick={() => {
              LogoutUser();
              handleMenu();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
