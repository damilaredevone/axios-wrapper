import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosConfig = AxiosRequestConfig & {
  success?: <T = any>(
    response?: AxiosResponse<T>
  ) => Promise<any> | void | Record<string, unknown>;
  error?: (
    response?: AxiosError
  ) => Promise<any> | void | Record<string, unknown>;
  onSuccess?: <T = any>(
    response?: AxiosResponse<T>
  ) => Promise<any> | void | Record<string, unknown>;
  onError?: (
    response?: AxiosError
  ) => Promise<any> | void | Record<string, unknown>;
};

export type PayloadRequest = Pick<
  AxiosConfig,
  | "success"
  | "error"
  | "method"
  | "url"
  | "headers"
  | "params"
  | "onSuccess"
  | "onError"
  | "timeout"
  | "data"
>;

const $request = async <T = any>({
  method,
  url,
  data,
  headers,
  params,
  error,
  success,
  onSuccess,
  onError,
}: Partial<AxiosConfig>): Promise<
  AxiosResponse<T, any> | void | boolean | AxiosError
> => {
  await axios({
    url,
    method,
    data,
    headers,
    params,
  })
    .then((response: AxiosResponse) => {
      onSuccess && typeof onSuccess === "function"
        ? onSuccess(response)
        : success!(response);
    })
    .catch((err: AxiosError) => {
      onError && typeof onError === "function" ? onError(err) : error!(err);
    });
};

export const $get = async (payload: PayloadRequest): Promise<void> => {
  await $request({
    method: "GET",
    ...payload,
  });
};

export const $post = async (payload: PayloadRequest): Promise<void> => {
  await $request({
    method: "POST",
    ...payload,
  });
};

export const $patch = async (payload: PayloadRequest): Promise<void> => {
  await $request({
    method: "PATCH",
    ...payload,
  });
};

export const $delete = async (payload: PayloadRequest): Promise<any> => {
  await $request({
    method: "DELETE",
    ...payload,
  });
};

export const $put = async (payload: PayloadRequest): Promise<void> => {
  await $request({
    method: "PUT",
    ...payload,
  });
};
