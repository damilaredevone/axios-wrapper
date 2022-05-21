import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosConfig = AxiosRequestConfig & {
 success?: <T = any>(
  response?: AxiosResponse<T>,
 ) => Promise<any> | void | Record<string, unknown>;
 error?: (
  response?: AxiosError,
 ) => Promise<any> | void | Record<string, unknown>;
 onSuccess?: <T = any>(
  response?: AxiosResponse<T>,
 ) => Promise<any> | void | Record<string, unknown>;
 onError?: (
  response?: AxiosError,
 ) => Promise<any> | void | Record<string, unknown>;
};

const $ajax = async <T = any>({
 method,
 url,
 data,
 headers = {},
 error,
 success,
 onSuccess,
 onError,
}: AxiosConfig): Promise<
 AxiosResponse<T, any> | void | boolean | AxiosError
> => {
 await axios({
  url,
  method,
  data,
  headers,
 })
  .then((response: AxiosResponse) => {
   success!(response);
   typeof onSuccess === 'function' && onSuccess(response);
  })
  .catch((err: AxiosError) => {
   error!(err);
   typeof onError === 'function' && onError(err);
  });
};

export const $get = async (payload: Record<string, unknown>): Promise<void> => {
 await $ajax({
  method: 'GET',
  ...payload,
 });
};

export const $post = async (
 payload: Record<string, unknown>,
): Promise<void> => {
 await $ajax({
  method: 'POST',
  ...payload,
 });
};

export const $patch = async (
 payload: Record<string, unknown>,
): Promise<void> => {
 await $ajax({
  method: 'PATCH',
  ...payload,
 });
};

export const $delete = async (
 payload: Record<string, unknown>,
): Promise<any> => {
 await $ajax({
  method: 'DELETE',
  ...payload,
 });
};

export const $put = async (payload: Record<string, unknown>): Promise<void> => {
 await $ajax({
  method: 'PUT',
  ...payload,
 });
};
