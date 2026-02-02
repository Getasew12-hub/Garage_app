import React from "react";
import Header from "../componets/Header";
import Discription from "../componets/Discription";
import OurServices from "../componets/OurServices";
import WhyChooseUs from "../componets/WhyChooseUs";
import { ArrowRight } from "lucide-react";

import AppointmentSuggesiton from "../componets/AppointmentSuggesiton";

function Home() {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 ">
        <Discription />
        <OurServices />
      </div>

      <div className="bg-gray-700 ">
        <div className="max-w-6xl ml-auto  flex justify-between items-center flex-col lg:flex-row gap-30 lg:gap-10">
          <div className="space-y-5 py-5  px-2.5 flex-1">
            <h2 className="font-bold text-xl sm:text-2xl">
              Quality Service And Customer Satisfaction !!
            </h2>

            <p className="tracking-wider max-w-[550px]">
              We utilize the most recent symptomatic gear to ensure your vehicle
              is fixed or adjusted appropriately and in an opportune manner. We
              are an individual from Professional Auto Service, a first class
              execution arrange, where free assistance offices share shared
              objectives of being world-class car administration focuses.
            </p>
          </div>

          <img
            src="/carspeed.png"
            alt=""
            className="flex-1 w-full object-cover max-h-[300px]"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 ">
        <WhyChooseUs />
        <AppointmentSuggesiton />
      </div>
    </div>
  );
}

export default Home;
