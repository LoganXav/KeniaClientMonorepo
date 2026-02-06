import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";

/**
 * Response builder helpers for API response format
 */

export function buildGetResponse<T>(data: T, message: string = "Resource fetched successfully"): GetRequestReturnType<T> {
  return {
    data,
    message,
    statusCode: 200,
  };
}

export function buildPostResponse<T>(
  data: T,
  message: string = "Resource created successfully",
  statusCode: number = 201
): PostRequestReturnType<T> {
  return {
    data,
    message,
    statusCode,
  };
}

export function buildAuthResponse<T extends { data: any; accessToken: string }>(
  data: T["data"],
  accessToken: string,
  message: string = "Sign in successful"
): T {
  return {
    data,
    accessToken,
    message,
    statusCode: 200,
  } as T;
}
