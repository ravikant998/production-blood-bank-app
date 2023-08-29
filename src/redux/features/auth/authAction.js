import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";
import {
  getCurrentUserData,
  userlogin,
  userregister,
} from "../../../api/endPoints";
/// Login Action
export const userSignin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const data = await axiosInstance.post(userlogin, {
        role,
        email,
        password,
      });
      if (data.data.success) {
        localStorage.setItem("token", data.data.token);
        toast.success(data.data.message);
        window.location.replace("/");
      }
      console.log("login", data);
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
// Registration
export const userRegister = createAsyncThunk(
  "/auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      organisationName,
      address,
      phone,
      website,
      hospitalName,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(userregister, {
        name,
        role,
        email,
        password,
        organisationName,
        address,
        phone,
        website,
        hospitalName,
      });
      if (data.success) {
        toast.success(data.message);
        window.location.replace("/signin");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/// Current User
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(getCurrentUserData);
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
