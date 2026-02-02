import React, { useEffect } from "react";
import Opperation from "./Opperation";
import dashboarStore from "../store/addmin";
import { Loader } from "lucide-react";

function Dashboard() {
  const { loading, DashboarData, dashbordData } = dashboarStore();
  useEffect(() => {
    DashboarData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader size={45} className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="font-bold tracking-wider sm:text-2xl text-xl ">
        Owner Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5  ">
        <div className="backgroundDiv surviceTestomon w-full!">
          <p className="font-semibold">Total Appontment</p>
          <p className="font-bold text-2xl">{dashbordData?.totalAppontment}</p>
        </div>

        <div className="backgroundDiv surviceTestomon w-full!">
          <p className="font-semibold">Total Completed Appontment</p>
          <p className="font-bold text-2xl">
            {dashbordData?.totalCompletedAppontment}
          </p>
        </div>

        <div className="backgroundDiv surviceTestomon w-full!">
          <p className="font-semibold">Total Pending Appontment</p>
          <p className="font-bold text-2xl">
            {dashbordData?.totalPendingAppontment}
          </p>
        </div>

        <div className="backgroundDiv surviceTestomon w-full!">
          <p className="font-semibold">Total Customer</p>
          <p className="font-bold text-2xl">{dashbordData?.toataCustomer}</p>
        </div>
      </div>

      <div>
        <Opperation
          recentAppontment={dashbordData?.recentAppontment}
          operationOverview={dashbordData?.operationOverview}
        />
      </div>
    </div>
  );
}

export default Dashboard;
