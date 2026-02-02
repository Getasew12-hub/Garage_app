import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import OpenMapComponent from "../componets/OpenMapComponent";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-20 space-y-28">
      <div className="relative z-0 h-96 w-full md:h-[450px] lg:h-[500px]">
        <OpenMapComponent />
      </div>
      <div>
        <h2 className="font-bold text-3xl">Our Address</h2>
        <p className="font-semibold tracking-wider">
          Completely synergize resource Professionally cultivate one-to-one
          customer service.
        </p>

        <div className="flex gap-2.5 my-5">
          <MapPin className="text-3xl text-blue-400" />
          <p className="font-semibold tracking-wider">
            Holeta,Addis Ababa,Ethipia
          </p>
        </div>
        <div className="flex gap-2.5 my-5">
          <Mail className="text-3xl text-blue-400" />
          <p className="font-semibold tracking-wider">example@gmail.com</p>
        </div>
        <div className="flex gap-2.5">
          <Phone className="text-3xl text-blue-400" />
          <p className="font-semibold tracking-wider">+251-11-555-987</p>
        </div>
      </div>

      <div className="bg-gray-700 rounded flex justify-between items-center p-10 gap-10 flex-col md:flex-row">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl mb-2">
            Schedule Your Appointment Today
          </h2>
          <p>Your Automotive Repair & Maintenance Service Specialist</p>
        </div>

        <button className="rounded flex gap-2 items-center bg-blue-400 text-white py-2 px-4">
          {" "}
          Appointment <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Contact;
