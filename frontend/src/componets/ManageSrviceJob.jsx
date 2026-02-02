import React, { useEffect } from "react";
import { ArrowRight, Loader, Trash2 } from "lucide-react";
import SelectMechanics from "./SelectMechanics";
import addminStore from "../store/addmin";
import toast from "react-hot-toast";
import Search from "./Search";

function ManageSrviceJob() {
  const {
    AppointmetData,
    loading,
    GetServiceJobs,
    DeleteServiceJob,
    smalLoad,
    UpdateSeriveStatus,
  } = addminStore();

  const [show, setShow] = React.useState(null);
  const [services, setServices] = React.useState();

  useEffect(() => {
    GetServiceJobs();
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

  function HandelAction(id, action) {
    UpdateAppointmentStatus(id, action);
  }

  function DeleteItem(id, status) {
    if (status !== "completed") {
      toast.error("You can't delete this item");
      return;
    }

    DeleteServiceJob(id);
  }
  function searchResult(result) {
    setServices(result);
  }
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold md:text-2xl text-xl mb-3 ">
          Manage Service Job
        </h2>

        <Search data={AppointmetData} searchResult={searchResult} />
      </div>

      {services?.length > 0 && (
        <div className="max-h-full overflow-y-auto  max-w-4xl w-full ">
          <table className="   w-full text-sm  md:text-md  ">
            <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
              <tr>
                <th className="text-start p-1 px-2.5 ">Car model</th>
                <th className="text-start p-1 px-2.5">VIN</th>
                <th className="text-start p-1 px-2.5 max-lg:hidden">
                  Mechanics
                </th>
                <th className="text-start p-1 px-2.5 max-md:hidden">
                  Service type
                </th>
                <th className="text-start p-1 px-2.5"> Status</th>

                <th className="text-start p-1 px-2.5">Change Mechanics</th>
                <th className="text-start p-1 px-2.5"> Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((val, index) => (
                <tr className="border border-gray-500 " key={index}>
                  <td className="p-2.5 ">{val.vehicle?.model}</td>
                  <td className="p-2.5">{val.vehicle?.VIN}</td>
                  <td className=" p-2.5 max-lg:hidden">
                    {val.mechanicId?.length}
                  </td>

                  <td className=" p-2.5">{val.appointment?.servicetype}</td>
                  <td
                    className={` p-2.5 max-md:hidden  ${val?.appointment?.status === "in-progress" && "text-yellow-500"} ${val?.appointment?.status === "completed" && "text-green-500"} ${val?.appointment?.status === "canceled" && "text-red-500"}`}
                  >
                    {val?.appointment?.status}
                  </td>
                  <td className=" p-2.5">
                    <button
                      onClick={() => setShow(index)}
                      className="flex items-center gap-2 bg-blue-400 rounded-full py-1 px-2 cursor-pointer text-[12px]!"
                    >
                      change <ArrowRight size={15} />
                    </button>

                    {show === index && (
                      <SelectMechanics
                        setShow={setShow}
                        val={val}
                        update={true}
                      />
                    )}
                  </td>
                  <td className=" p-2.5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          DeleteItem(val._id, val.appointment?.status)
                        }
                        className="cursor-pointer"
                      >
                        {smalLoad ? (
                          <Loader size={18} />
                        ) : (
                          <Trash2 size={18} color="red" />
                        )}
                      </button>
                      <select
                        onChange={(e) =>
                          UpdateSeriveStatus(val._id, e.target.value)
                        }
                        name="action"
                        className="border border-gray-500 py-1 px-2 rounded text-[10px] cursor-pointer"
                        defaultValue={val?.appointment?.status}
                      >
                        <option value="in-progress">In-progress</option>
                        <option value="canceled">Canceled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
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

export default ManageSrviceJob;
