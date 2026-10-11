import axios from "axios"

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()

const getApiBaseUrl = () => {
    if (!import.meta.env.PROD) {
        return (configuredApiUrl || "/api").replace(/\/+$/, "")
    }

    if (!configuredApiUrl) {
        throw new Error(
            "VITE_API_URL must be set to your deployed backend URL in the Vercel frontend project."
        )
    }

    let apiUrl
    try {
        apiUrl = new URL(configuredApiUrl)
    } catch {
        throw new Error(
            "VITE_API_URL must be an absolute URL for the deployed backend, not a relative path such as /api."
        )
    }

    if (!["http:", "https:"].includes(apiUrl.protocol)) {
        throw new Error("VITE_API_URL must use HTTP or HTTPS.")
    }

    const apiPath = apiUrl.pathname.replace(/\/+$/, "")
    if (!apiPath.endsWith("/api")) {
        apiUrl.pathname = `${apiPath}/api`
    }
    apiUrl.search = ""
    apiUrl.hash = ""

    return apiUrl.toString().replace(/\/+$/, "")
}

export const API = axios.create({
    baseURL: getApiBaseUrl(),
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