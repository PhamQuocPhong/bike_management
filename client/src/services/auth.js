
import Router from "../router";
import Vue from "vue";
export default {
  login: async data => {
    try {
      const res = await axios.post("/auth/login", data);
      if (res) {
        return res;
      }
    } catch (error) {
      return error.response;
    }
  },

  register: async data => {
    try {
      const res = await axios.post("auth/register", data);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  refreshToken: async data => {
    try {
      const res = await axios.post("auth/refresh-token", data);
      return res;
    } catch(error) {
      return error.response;
    }
  },

  loginSocial: async (data, option) => {
    try {
      const res = await axios.post(`/auth/${option}`, data);
      if (res) {
        return res;
      }
    } catch (error) {
      return error.response;
    }
  }
};
