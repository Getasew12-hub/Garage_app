import {
  Facebook,
  GitMerge,
  Linkedin,
  LocateIcon,
  Mail,
  Map,
  MapIcon,
  MapPin,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const adminPath = location.pathname.startsWith("/admin");
  return (
    <div
      className={`${adminPath && "hidden"} bg-gray-900 mt-60 py-14 overflow-x-hidden`}
    >
      <div className="max-w-6xl mx-auto px-4 space-y-20">
        <div className="grid md:grid-cols-3 grid-cols-2  gap-10 ">
          <div className="flex gap-4 max-lg:flex-col md:justify-center md:items-center">
            <MapPin />
            <span className="tracking-wider">
              54B, Tailstoi Town 5238 MT,La city, IA 522364
            </span>
          </div>
          <div className="flex gap-4 max-lg:flex-col md:justify-center md:items-center">
            <Mail />
            <p className="tracking-wider wrap-break-word ">
              {" "}
              <span className="font-semibold ">Email us: </span>family@gamil.com
            </p>
          </div>
          <div className="flex gap-4 max-lg:flex-col md:justify-center md:items-center">
            <Phone />
            <p className="tracking-wider">
              {" "}
              <span className="font-semibold">Call us on: </span>+2519 456 78900
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-20 flex-wrap">
          <div>
            <p className="font-bold md:text-xl tracking-wider mb-5">
              Usefull Links
            </p>

            <ul>
              <Link to="/">
                {" "}
                <li>Home</li>
              </Link>
              <Link to={"/aboutus"}>
                {" "}
                <li>About Us</li>
              </Link>
              <Link to={"/appointment"}>
                <li>Appointment</li>
              </Link>
              <Link to="/testimonials">
                {" "}
                <li>Testimonials</li>
              </Link>
              <Link to="/contact">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
          <div>
            <p className="font-bold md:text-xl tracking-wider mb-5">
              Our Services
            </p>

            <ul>
              <li>Performance Upgrade</li>
              <li>Transmission Service</li>
              <li>Break Repair & Service</li>
              <li>Engine Service & Repair</li>
              <li>Trye & Wheels</li>
            </ul>
          </div>
          <div>
            <p className="font-bold md:text-xl tracking-wider mb-5">
              Newsletter
            </p>

            <ul className="flex gap-3">
              <li className="border h-8 w-8 rounded-full flex justify-center items-center hover:bg-blue-400 hover:border-blue-400">
                <Facebook />
              </li>
              <li className="border h-8 w-8 rounded-full flex justify-center items-center hover:bg-blue-400 hover:border-blue-400">
                <Linkedin />
              </li>
              <li className="border h-8 w-8 rounded-full flex justify-center items-center hover:bg-blue-400 hover:border-blue-400">
                <X />
              </li>
              <li className="border h-8 w-8 rounded-full flex justify-center items-center hover:bg-blue-400 hover:border-blue-400">
                <Youtube />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
