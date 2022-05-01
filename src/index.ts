import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosConfig = AxiosRequestConfig & {
 success?: <T = any>(
  response?: AxiosResponse<T>,
 ) => Promise<any> | void | Record<string, unknown>;
 error?: (
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
   if (
    response.data.success === true ||
    response.data.status === true ||
    response.data.data
   ) {
    success!(response);
   }
  })
  .catch((err: AxiosError) => {
   error!(err);
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
