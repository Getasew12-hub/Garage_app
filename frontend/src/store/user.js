import { create } from "zustand";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
function validatePhone(phone) {
    if(phone.toString().length<10){
        return false
    }

  const re = /^[0-9]{10}$/;
  return re.test(String(phone).toLocaleLowerCase());
}

const userStore = create((set, get) => ({
  user: null,
  checkAuth: true,
  loading: false,

  SingupUser: async (userData) => {
  
    
    if (!validateEmail(userData.email)) {
        
      return toast.error("Invalid email format");
    }
    if (userData.password.length < 6 || !userData.password) {
   
      return toast.error("Password must be at least 6 characters long");
    }
    if (!userData.name) {
      
      return toast.error("Name is required");
    }

    if (!validatePhone(userData.phone)) {
     
      return toast.error("Invalid phone number");
    }

    if (!userData.address) {
    
      return toast.error("Address is required");
    }

set({ loading: true });
    try {
      const { name, email, password, phone, address } = userData;
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
      });
      set({ user: response.data.newuser });
      toast.success("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },

  LoginUser: async (userData) => {
    
    if (!validateEmail(userData.email))
      return toast.error("Invalid email format");
    if (!userData.password) return toast.error("Password is required");
    set({ loading: true });
    try {
      const { email, password } = userData;
      const response = await axios.post("/auth/login", { email, password });
      set({ user: response.data.existingUser });
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ loading: false });
    }
  },
  LogoutUser: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      set({ loading: false });
    }
  },
  CheckAuth: async () => {
    set({ loading: true, checkAuth: true });
    try {
      const response = await axios.post("/auth/check-auth");
      set({ user: response.data.user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ loading: false, checkAuth: false });
    }
  },
}));

export default userStore;
