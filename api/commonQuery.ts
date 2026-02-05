import api from "./axiosInstance";
import qs from "qs";

// 📌 Generic GET
export const getRequest = async <T>(
  url: string,
  params?: object,
): Promise<T> => {
  const res = await api.get(url, { params });
  return res.data;
};

const isFileObject = (value: any) =>
  value &&
  typeof value === "object" &&
  typeof value.uri === "string" &&
  (value.type || value.mimeType);

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

      // 📦 ARRAY
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (isFileObject(item)) {
            // array of files
            formData.append(`${key}[]`, {
              uri: item.uri,
              type: item.type || item.mimeType,
              name: item.name || "file.jpg",
            } as any);
          } else {
            // array of primitives
            formData.append(`${key}[]`, String(item));
          }
        });
      }

      // 🖼️ FILE
      else if (isFileObject(value)) {
        formData.append(key, {
          uri: value.uri,
          type: value.type || value.mimeType,
          name: value.name || "file.jpg",
        } as any);
      }

      // 🔘 BOOLEAN
      else if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
      }

      // 🔢 NUMBER / 📝 STRING
      else {
        formData.append(key, String(value));
      }
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
    console.log(error);
  }
};
