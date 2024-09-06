import { env } from "@/env.mjs";
import axios from "axios";

const BASEURL = env.NEXT_PUBLIC_BASE_URL;

export const apiConfig = axios.create({
  baseURL: BASEURL,
});

apiConfig.interceptors.request.use((config) => {
  if (env.NODE_ENV) {
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

  return config;
});

apiConfig.interceptors.response.use(
  (response) => {
    if (env.NODE_ENV) {
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
    return response;
  },
  (error) => {
    if (env.NODE_ENV) {
      if (error?.response) {
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
            message: error.response.data?.errors?.[0]?.message || error?.response?.data?.data?.message,
            status: error.response.status,
          }
        : {
            defaultUserMessage: "Something went wrong",
            message: "Something went wrong",
            status: 500,
          }
    );
  }
);
