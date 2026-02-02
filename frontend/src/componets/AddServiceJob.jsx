import React, { useEffect } from "react";
import { ArrowRight, Loader } from "lucide-react";
import SelectMechanics from "./SelectMechanics";
import addminStore from "../store/addmin";
import Search from "./Search";

function AddServiceJob() {
  const { loading, GetAppoitments, AppointmetData } = addminStore();
  const [show, setShow] = React.useState(false);
  const [services, setServices] = React.useState();

  useEffect(() => {
    GetAppoitments();
  }, []);
  useEffect(() => {
    setServices(AppointmetData);
  }, [AppointmetData]);

  if (loading || !services)
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader size={45} className="animate-spin" />
      </div>
    );

  function searchResult(result) {
    setServices(result);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold md:text-2xl text-xl mb-3 ">Add Service Job</h2>
        <Search data={AppointmetData} searchResult={searchResult} />
      </div>
      {services?.length > 0 && (
        <div className="max-h-full overflow-y-auto  max-w-4xl w-full ">
          <table className="   w-full text-sm  md:text-md  ">
            <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
              <tr>
                <th className="text-start p-1 px-2.5 ">Owner name</th>
                <th className="text-start p-1 px-2.5">Car model</th>
                <th className="text-start p-1 px-2.5">VIN</th>

                <th className="text-start p-1 px-2.5">Appointment date</th>
                <th className="text-start p-1 px-2.5">Select Mechanics</th>
              </tr>
            </thead>
            <tbody>
              {services.map((val, index) => (
                <tr className="border border-gray-500 " key={index}>
                  <td className="p-2.5">{val?.user?.name}</td>
                  <td className="p-2.5">{val?.vehicle?.model}</td>
                  <td className=" p-2.5">{val?.vehicle?.VIN}</td>

                  <td className=" p-2.5">
                    {val?.appointmentDate?.split("T")[0]}
                  </td>
                  <td className=" p-2.5">
                    <div>
                      <button
                        onClick={() => setShow(true)}
                        className="flex items-center gap-2 bg-blue-400 rounded-full py-1 px-2 cursor-pointer"
                      >
                        Select <ArrowRight size={15} />
                      </button>
                    </div>
                    {show && <SelectMechanics setShow={setShow} val={val} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddServiceJob;
