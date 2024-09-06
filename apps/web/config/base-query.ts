import { apiConfig } from "./http";

interface PostRequestPropsType {
  endpoint: string;
  payload: Record<string, any>;
  config?: any;
}

interface PostRequestReturnType<T> {
  data: {
    data: {
      data: T;
      message: string;
    };
  };
  status: string;
  statusCode: number;
}

export const postRequest = async <T>({ endpoint, payload, config = {} }: PostRequestPropsType): Promise<PostRequestReturnType<T>> => {
  return await apiConfig.post(endpoint, payload, config);
};
