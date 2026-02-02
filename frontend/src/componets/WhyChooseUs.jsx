import React from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BuildIcon from "@mui/icons-material/Build";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
function WhyChooseUs() {
  return (
    <div className="space-y-5 mt-32 mb-28">
      <h2 className="font-bold text-2xl sm:text-3xl">Why Choose Us</h2>
      <p>
        Bring to the table win-win survival strategies to ensure proactive
        domination. At the end of the day, going forward, a new normal that has
        evolved from generation heading towards.
      </p>

      <div className="grid sm:grid-cols-2  md:grid-cols-4  gap-4">
        <div className="surviceTestomon backgroundDiv py-10! flex-1">
          <EngineeringIcon className="text-6xl!" />
          <p className="font-semibold tracking-wider ">
            Certified Expert Mechanics
          </p>
        </div>
        <div className="surviceTestomon backgroundDiv py-10! flex-1">
          <BuildIcon className="text-6xl!" />
          <p className="font-semibold tracking-wider">
            Fast And Quality Service
          </p>
        </div>
        <div className="surviceTestomon backgroundDiv py-10! flex-1">
          <LocalOfferIcon className="text-6xl!" />
          <p className="font-semibold tracking-wider">Best Prices in Town</p>
        </div>
        <div className="surviceTestomon backgroundDiv py-10! flex-1">
          <EmojiEventsIcon className="text-6xl!" />
          <p className="font-semibold tracking-wider">Awarded Workshop</p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
