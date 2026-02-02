import React from "react";

function Discription() {
  return (
    <div className=" text-white py-16   flex justify-between  items-center gap-20 flex-col md:flex-row">
      <div className="flex-1 space-y-5 max-w-[500px] lg:max-w-2xl">
        <p>WHO WE ARE</p>
        <h2 className="font-bold tracking-wider text-2xl md:text-3xl mt-8 mb-3.5">
          Family Garage
        </h2>
        <p className="tracking-wider">
          With more than 20 years of experience in the field (20 Mechanical and
          12 in remapping and advance diagnostics), we know our industry like
          the back of our hands. There’s no challenge too big or too small, and
          we dedicate our utmost energy to every customer, large or small.
        </p>
        <p className="tracking-wider">
          We are fully equipped to tackle any mechanical repair, from fitting a
          new bulb to replacing an entire engine.
        </p>

        <ul className="list-[square] list-inside my-4 tracking-wider">
          <li>Motor Industry Code of Practise</li>
          <li>Trading Standards Approved Code</li>
          <li>Part Approved Garages Network</li>
          <li>AA™ Good Garage Guide</li>
        </ul>
      </div>

      <div className="flex-1">
        <img
          src="/intro-home.png"
          alt="car image"
          className="max-w-[550px] w-full"
        />
      </div>
    </div>
  );
}

export default Discription;
