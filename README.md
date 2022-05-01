# Axios Wrapper

### Install

```bash
// using npm
npm i axios @damilaredev/axios-wrapper --save

// using yarn
yarn add axios @damilaredev/axios-wrapper --save

// using pnpm
pnpm i axios @damilaredev/axios-wrapper
```

### Methods

- $post
- $get
- $put
- $delete
- $patch

### Usage

```ts
import { $post, $get } from '@damilaredev/vue-axios';

export const saveUser = async () => {
 await $post({
  url: `your-url`,
  headers,
  data,
  success: (response: AxiosResponse<T>) => console.log(response),
  error: (error: AxiosError) => console.log(error),
 });
};

export const getUser = async () => {
 await $get({
  url: `your-url`,
  headers,
  success: (response: AxiosResponse) => console.log(response),
  error: (error) => console.log(error),
 });
};
```
