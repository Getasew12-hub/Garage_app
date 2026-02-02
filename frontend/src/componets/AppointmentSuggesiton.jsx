import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AppointmentSuggesiton() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-700 rounded flex justify-between items-center p-10 gap-10 flex-col md:flex-row">
      <div>
        <h2 className="font-bold text-2xl md:text-3xl mb-2">
          Schedule Your Appointment Today
        </h2>
        <p>Your Automotive Repair & Maintenance Service Specialist</p>
      </div>

      <button
        onClick={() => navigate("/appointment")}
        className="rounded flex gap-2 items-center bg-blue-400 text-white py-2 px-4"
      >
        {" "}
        Appointment <ArrowRight />
      </button>
    </div>
  );
}

export default AppointmentSuggesiton;
