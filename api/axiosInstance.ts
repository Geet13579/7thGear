import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE_URL } from "@env";
import useAuthStore from "../store/authenticationStore";
import { API_BASE_URL } from "../constants/apiEndpoints";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// ⬆️ Add bearer token
api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔁 Handle 401 refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token, refreshToken: newRT, expiresIn } = res.data;

        await useAuthStore.getState().setTokens(token, newRT, expiresIn);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        originalReq.headers.Authorization = `Bearer ${token}`;

        return api(originalReq);
      } catch (e) {
        await useAuthStore.getState().logOut();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
