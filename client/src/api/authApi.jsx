import axios from "axios"

export const API = axios.create({
    baseURL: "/api",
    withCredentials: true
})

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalReq = error.config

        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true

            try {
                const response = await API.post("/auth/refresh-token")

                const token = response.data.accessToken

                localStorage.setItem("accessToken", token)

                originalReq.headers.Authorization = `Bearer ${token}`

                return API(originalReq)
            } catch (error) {
                window.location.href = "/"
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)