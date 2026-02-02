import { create } from "zustand";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";

const addminStore = create((set, get) => ({
  loading: false,
  smalLoad: false,
  formLoading: false,
  dashbordData: [],
  AppointmetData: [],
  MechanicsData: [],

  DashboarData: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/admin/dashboard");
      set({ dashbordData: response.data });
    } catch (error) {
      console.error("Login error:", error);
      set({ dashbordData: [] });
    } finally {
      set({ loading: false });
    }
  },

  GetAppoitments: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/appointemenCars");

      set({ AppointmetData: response.data.appointments });
    } catch (error) {
      console.error("Login error:", error);
      set({ AppointmetData: [] });
    } finally {
      set({ loading: false });
    }
  },
  GetAllAppoitments: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/getAppointments");

      set({ AppointmetData: response.data.appointments });
    } catch (error) {
      console.error("Login error:", error);
      set({ AppointmetData: [] });
    } finally {
      set({ loading: false });
    }
  },
  GetServiceJobs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/getServiceJobs");

      set({ AppointmetData: response.data.serviceJobs });
    } catch (error) {
      console.log("error on get service jobs", error);
      set({ AppointmetData: [] });
    } finally {
      set({ loading: false });
    }
  },

  GetMechanics: async () => {
    set({ smalLoad: true });
    try {
      const response = await axios.get("/admin/getMechanics");

      set({ MechanicsData: response.data.mechanics });
    } catch (error) {
      console.error("Login error:", error);
      set({ MechanicsData: [] });
    } finally {
      set({ smalLoad: false });
    }
  },
  GetVehicles: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/getVehicles");

      set({ AppointmetData: response.data.vehicles });
    } catch (error) {
      console.error("error on get vehicles", error);
      set({ AppointmetData: [] });
    } finally {
      set({ loading: false });
    }
  },
  GetUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/getUsers");

      set({ AppointmetData: response.data.users });
    } catch (error) {
      console.error("Login error:", error);
      set({ AppointmetData: [] });
    } finally {
      set({ loading: false });
    }
  },

  AddSerivceJob: async ({ seletDate, val }) => {
    set({ formLoading: true });
    try {
      const response = await axios.post("/admin/addServiceJob", {
        seletDate,
        val,
      });
      set({
        AppointmetData: get().AppointmetData.filter(
          (vehicle) => vehicle._id !== val._id,
        ),
      });
      return "true";
    } catch (error) {
      console.error("Login error:", error);
      return "false";
    } finally {
      set({ formLoading: false });
    }
  },
  UpdateAppointmentStatus: async (id, val) => {
    set({ formLoading: true });
    try {
      const response = await axios.put(`/appointment/updateAppointment/${id}`, {
        status: val,
      });
      set({
        AppointmetData: get().AppointmetData.map((appointment) => {
          if (appointment._id === id) {
            return { ...appointment, status: val };
          }
          return appointment;
        }),
      });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("add service error:", error);
      toast.error("failed to update status");
    } finally {
      set({ formLoading: false });
    }
  },
  UpdateServiceMechanics: async ({ seletDate, val }) => {
    set({ formLoading: true });
    try {
      const response = await axios.put("/admin/updateServiceMechanics", {
        seletDate,
        val,
      });
      set({
        AppointmetData: get().AppointmetData.map((appointment) => {
          if (appointment._id === val._id) {
            return { ...appointment, mechanicId: seletDate };
          }
          return appointment;
        }),
      });
      toast.success("Status updated successfully");
      return "true";
    } catch (error) {
      console.log("error on update service job", error);
      toast.error("failed to update status");
      return "false";
    } finally {
      set({ formLoading: false });
    }
  },
  DeleteServiceJob: async (id) => {
    set({ smalLoad: true });
    try {
      const response = await axios.delete(`/admin/deleteServiceJob/${id}`);
      set({
        AppointmetData: get().AppointmetData.filter(
          (vehicle) => vehicle._id !== id,
        ),
      });
      toast.success("Service job deleted successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("failed to delete service job");
    } finally {
      set({ smalLoad: false });
    }
  },

  UpdateSeriveStatus: async (id, val) => {
    console.log("i am call now", id, val);
    set({ formLoading: true });
    try {
      const response = await axios.put(`/admin/updateServiceStatus/${id}`, {
        status: val,
      });
      set({
        AppointmetData: get().AppointmetData.map((appointment) => {
          if (appointment._id === id) {
            const updateval = { ...appointment.appointment, status: val };
            return { ...appointment, appointment: updateval };
          }
          return appointment;
        }),
      });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("failed to update status");
    } finally {
      set({ formLoading: false });
    }
  },

  DeleteCar: async (id) => {
    try {
      const response = await axios.delete(`/admin/deleteCar/${id}`);
      set({
        AppointmetData: get().AppointmetData.filter(
          (vehicle) => vehicle._id !== id,
        ),
      });
      toast.success("Car deleted successfully");
    } catch (error) {
      console.log("error on delete car", error);
      toast.error(error?.response?.data?.message || "failed to delete car");
    }
  },

  UpdateUserRole: async (id, val) => {
    set({ formLoading: true });
    try {
      const response = await axios.put(`/admin/changeUserRole/${id}`, {
        role: val,
      });
      set({
        AppointmetData: get().AppointmetData.map((appointment) => {
          if (appointment._id === id) {
            return { ...appointment, role: val };
          }
          return appointment;
        }),
      });
      toast.success("Role updated successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("failed to update role");
    } finally {
      set({ formLoading: false });
    }
  },

  DeleteUser: async (id) => {
    try {
      const response = await axios.delete(`/admin/deleteUser/${id}`);
      set({
        AppointmetData: get().AppointmetData.filter(
          (vehicle) => vehicle._id !== id,
        ),
      });
      toast.success("User deleted successfully");
    } catch (error) {
      console.log("error on delete user", error);
      toast.error(error?.response?.data?.message || "failed to delete user");
    }
  },
}));

export default addminStore;
