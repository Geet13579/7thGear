import api from "./axiosInstance";
import qs from "qs";

// 📌 Generic GET
export const getRequest = async <T>(
  url: string,
  params?: object
): Promise<T> => {
  const res = await api.get(url, { params });
  return res.data;
};

// 📌 Generic POST
export const postRequest = async <T, B = any>(
  url: string,
  body?: B,
  asFormData: boolean = false,
  asUrlEncoded: boolean = false
): Promise<T> => {
  let data: any = body;
  let headers: any = {};

  // 🎯 If FormData
  if (asFormData) {
    const formData = new FormData();
    Object.entries(body || {}).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    data = formData;
    headers["Content-Type"] = "multipart/form-data";
  }

  // 🎯 If x-www-form-urlencoded
  else if (asUrlEncoded) {
    data = qs.stringify(body);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  // 🎯 Else send JSON (default)
  else {
    headers["Content-Type"] = "application/json";
  }
try {
  const res = await api.post(url, data, { headers });
  return res.data;
} catch (error) {
  console.log(error)
}
  
};
