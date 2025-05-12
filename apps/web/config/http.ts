import { RouteEnums } from "@/constants/router/route-constants";
import { env } from "@/env.mjs";
import { clearAuthUserAction, getAuthUserAction } from "@/helpers/server/auth-user-action";
import axios from "axios";
import CryptoJS from "crypto-js";

const DEV = "development";
const BASEURL = env.NEXT_PUBLIC_BASE_URL;
const IV = CryptoJS.enc.Hex.parse(env.NEXT_PUBLIC_AES_ENCRYPTION_IV);
const KEY = CryptoJS.enc.Hex.parse(env.NEXT_PUBLIC_AES_ENCRYPTION_KEY);

export const apiConfig = axios.create({
  baseURL: BASEURL,
});

apiConfig.interceptors.request.use(async (config) => {
  const authUser = await getAuthUserAction();

  let data: Record<string, any> = {
    userId: authUser?.data?.id,
    tenantId: authUser?.data?.tenantId,
  };

  if (authUser?.accessToken) {
    data.authorization = `Bearer ${authUser?.accessToken}`;
    Object.assign(data, config.data ?? {});
    config.data = data;
  } else {
    data = config.data ?? data;
  }

  if (env.NODE_ENV !== DEV) {
    config.data = {
      request: CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: IV,
      }).toString(),
    };
  }

  if (env.NODE_ENV === DEV) {
    console.groupCollapsed(`@Request`, config.url);
    if (config.params) {
      console.groupCollapsed("Params");
      console.info(config.params);
      console.groupEnd();
    }
    if (config.data) {
      console.groupCollapsed("Data");
      console.info(config.data);
      console.groupEnd();
    }
    console.groupEnd();
  }

  config.method = "POST";

  return config;
});

apiConfig.interceptors.response.use(
  (response) => {
    if (response?.data?.encoded) {
      const decrypted = CryptoJS.AES.decrypt(response?.data?.result, KEY, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: IV,
      });

      // Convert decrypted WordArray to UTF-8 string
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      // Parse the decrypted text as JSON
      response.data.result = JSON.parse(decryptedText);
    }
    if (env.NODE_ENV === DEV) {
      console.groupCollapsed(`@Response`, response.config.url, response.status);
      if (response.data) {
        console.groupCollapsed("Data");
        console.info(response.data);
        console.groupEnd();
      }
      if (response.config.params) {
        console.groupCollapsed("Params");
        console.info(response.config.params);
        console.groupEnd();
      }
      if (response.headers) {
        console.groupCollapsed("Headers");
        console.info(response.headers);
        console.groupEnd();
      }
      console.groupEnd();
    }

    return response.data.result;
  },
  async (error) => {
    if (error?.response) {
      if (error?.response?.data?.encoded) {
        const decrypted = CryptoJS.AES.decrypt(error?.response?.data?.result, KEY, {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: IV,
        });

        // Convert decrypted WordArray to UTF-8 string
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        // Parse the decrypted text as JSON
        error.response.data = JSON.parse(decryptedText);
      }

      if (error.response.status == 403) {
        await clearAuthUserAction();
        localStorage.removeItem("authUser");
        window.location.href = RouteEnums.HOME;
      }

      if (env.NODE_ENV === DEV) {
        console.groupCollapsed(`@Response`, error.response.config.url, error.response.status);
        if (error.response.data) {
          console.groupCollapsed("Data");
          console.info(error.response.data);
          console.groupEnd();
        }
        if (error.response.config.params) {
          console.groupCollapsed("Params");
          console.info(error.response.config.params);
          console.groupEnd();
        }
        if (error.response.headers) {
          console.groupCollapsed("Headers");
          console.info(error.response.headers);
          console.groupEnd();
        }
        console.groupEnd();
      }
    }

    return Promise.reject(
      error.response
        ? {
            message:
              error.response.data?.errors?.[0]?.message ||
              error?.response?.data?.data?.message ||
              error?.response?.data?.message ||
              error?.response?.data?.details?.[0]?.message ||
              error?.response?.data?.result?.message?.name ||
              error?.response?.data?.result?.message ||
              "Something went wrong. Please contact admin.",

            status: error.response.status,
          }
        : {
            message: "Something went wrong. Please contact admin.",
            status: 500,
          }
    );
  }
);
