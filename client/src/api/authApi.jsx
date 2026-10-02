import axios from "axios"

export const API = axios.create({
    baseURL:"http://localhost:5173/api",
    withCredentials:true
})


API.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalReq = error.config;

    if (error.response.status === 401 && !originalReq.retry) {
      originalReq.retry = true;

      try {
      let response =   await API.post("/auth/refresh-token");
      const token = response.data.accessToken
        localStorage.setItem("accessToken",token)
        return API(originalReq);
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
  }
);