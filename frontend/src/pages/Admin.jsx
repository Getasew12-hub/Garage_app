import React, { useEffect, useState } from "react";
import Dashboard from "../componets/Dashboard";
import AddServiceJob from "../componets/AddServiceJob";
import ManageAppointment from "../componets/ManageAppointment";
import ManageSrviceJob from "../componets/ManageSrviceJob";
import ManageVhicles from "../componets/ManageVhicles";
import ManageUsers from "../componets/ManageUsers";
import { useSearchParams } from "react-router-dom";
import dashboarStore from "../store/addmin";

function Admin({ openAdminMenu, setOpenAdminMenu }) {
  
  const menuRef = React.useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [qauryParams, setQauryParams] = useState("dashboard");

  const path = searchParams.get("path");
  useEffect(() => {
    if (path) {
      setQauryParams(path);
    }
  },[])

   useEffect(() => {
          document.addEventListener("mousedown", (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
              setOpenAdminMenu(false);
            }
          })
      })
          function handleMenu(){
        if(openAdminMenu){
            setOpenAdminMenu(false)
        }
    }
  function HandleQuarychange(val){
    setQauryParams(val)
    setSearchParams({"path":val})
    handleMenu()
  }

  return (
    <div className="flex h-screen overflow-hidden  gap-5 ">
      {/* left side bar */}
      <div className={`flex flex-col gap-4 bg-gray-700 pt-16 items-start  font-semibold tracking-wider ${openAdminMenu ? "translate-x-0" : "max-lg:-translate-x-full" }   max-lg:fixed inset-y-0 z-30  transition duration-300 ease-in-out max-lg:border-r max-lg:border-gray-400`} ref={menuRef}>
        <button
        onClick={()=>HandleQuarychange("dashboard")}
          className={`${qauryParams == "dashboard" && "bg-blue-400! "} addiminButton`}
        >
          Dashboard
        </button>
        <button
         onClick={()=>HandleQuarychange("addservicejob")}
          className={`${qauryParams === "addservicejob" && "bg-blue-400! "} addiminButton`}
        >
          Add service job
        </button>
        <button
        onClick={()=>HandleQuarychange("manageappointment")}
          className={`${qauryParams === "manageappointment" && "bg-blue-400! "} addiminButton`}
        >
          Manage appointment
        </button>
        <button
        onClick={()=>HandleQuarychange("manageservicejob")}
          className={`${qauryParams === "manageservicejob" && "bg-blue-400! "} addiminButton`}
        >
          Manage service job
        </button>
        <button
        onClick={()=>HandleQuarychange("managevhicles")}
          className={`${qauryParams === "managevhicles" && "bg-blue-400! "} addiminButton`}
        >
          Manage vhicles
        </button>
        <button
        onClick={()=>HandleQuarychange("manageusers")}
          className={`${qauryParams === "manageusers" && "bg-blue-400! "} addiminButton`}
        >
          Manage users
        </button>
      </div>

      {/* right side */}
      <div className="pt-16  flex-1 px-2.5 overflow-y-auto max-h-full pb-20">
      {qauryParams == "dashboard" &&  <Dashboard /> } 
      {qauryParams === "addservicejob" &&  <AddServiceJob />}  
      {qauryParams === "manageappointment" &&  <ManageAppointment />}  
      {qauryParams === "manageservicejob" &&  <ManageSrviceJob />}  
      {qauryParams === "managevhicles" &&  <ManageVhicles />}  
      {qauryParams === "manageusers" &&  <ManageUsers />}
        
      </div>
    </div>
  );
}

export default Admin;
