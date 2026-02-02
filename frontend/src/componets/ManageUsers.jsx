import { Loader, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import addminStore from "../store/addmin";
import Search from "./Search";

function ManageUsers() {
  const { loading, GetUsers, AppointmetData, UpdateUserRole, DeleteUser } =
    addminStore();
  const [services, setServices] = React.useState();

  useEffect(() => {
    GetUsers();
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
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold md:text-2xl text-xl mb-3 ">Manage Users </h2>
          <Search
            data={AppointmetData}
            searchResult={searchResult}
            type={"user"}
          />
        </div>

        {services?.length > 0 && (
          <div className="max-h-full overflow-y-auto  max-w-4xl w-full ">
            <table className="   w-full text-sm  md:text-md  ">
              <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
                <tr>
                  <th className="text-start p-1 px-2.5"> Name</th>
                  <th className="text-start p-1 px-2.5">Phone</th>
                  <th className="text-start p-1 px-2.5 max-lg:hidden">Role</th>
                  <th className="text-start p-1 px-2.5 max-md:hidden">
                    Address
                  </th>
                  <th className="text-start p-1 px-2.5"> Change role</th>
                  <th className="text-start p-1 px-2.5"> Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((val, index) => (
                  <tr className="border border-gray-500 " key={index}>
                    <td className="p-2.5 ">{val.name}</td>
                    <td className="p-2.5">{val.phone}</td>
                    <td className=" p-2.5 max-lg:hidden">{val.role}</td>

                    <td className=" p-2.5 max-md:hidden">{val.address}</td>
                    <td className=" p-2.5 ">
                      <select
                        name="action"
                        className="border border-gray-500 py-1 px-2 rounded text-[10px] cursor-pointer"
                        defaultValue={val.role}
                        onChange={(e) =>
                          UpdateUserRole(val._id, e.target.value)
                        }
                      >
                        <option value="customer">customer</option>
                        <option value="mechanic">mechanic</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>

                    <td className=" p-2.5">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => DeleteUser(val._id)}
                          className="cursor-pointer"
                        >
                          <Trash2 size={18} color="red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
