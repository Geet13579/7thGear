import api from "./axiosInstance";
import qs from "qs";

// 📌 Generic GET
export const getRequest = async <T>(
  url: string,
  params?: object,
): Promise<T> => {
  try {
    const res = await api.get(url, { params });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.data.status,
        message: error.response.data.message,
        data: error.response.data.data,
      };
    }

    throw {
      status: false,
      message: "Network error",
    };
  }
};

const isFileObject = (value: any) =>
  value &&
  typeof value === "object" &&
  typeof value.uri === "string" &&
  (value.type || value.mimeType);

const isJsonString = (value: any) => {
  if (typeof value !== "string") return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

// 📌 Generic POST
export const postRequest = async <T, B = any>(
  url: string,
  body?: B,
  asFormData: boolean = false,
  asUrlEncoded: boolean = false,
): Promise<T> => {
  let data: any = body;
  let headers: any = {};
  // console.log(data, asFormData)
  // 🎯 If FormData
  if (asFormData) {
    const formData = new FormData();

    Object.entries(body || {}).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      // 🧠 1. JSON STRING (MUST COME FIRST)
      if (typeof value === "string") {
        formData.append(key, value);
        return;
      }

      // 📦 2. ARRAY (normal arrays)
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (isFileObject(item)) {
            formData.append(`${key}[]`, {
              uri: item.uri,
              type: item.type || item.mimeType,
              name: item.name || "file.jpg",
            } as any);
          } 
          else {
            formData.append(key, String(item));
          }
        });
        return;
      }

      // 🖼️ 3. FILE
      if (isFileObject(value)) {
        formData.append(key, {
          uri: value.uri,
          type: value.type || value.mimeType,
          name: value.name || "file.jpg",
        } as any);
        return;
      }

      // 🔘 4. BOOLEAN
      if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
        return;
      }

      // 🔢 5. NUMBER / STRING
      formData.append(key, String(value));
    });

    data = formData;
    console.log("payload", data)
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
    if (error.response) {
      throw {
        status: error.response.data.status,
        message: error.response.data.message,
        data: error.response.data.data,
      };
    }

    throw {
      status: false,
      message: "Network error",
    };
  }
};
