import axios, { AxiosError } from 'axios';

// const authios = new Proxy(axios, {

// });

const authios = axios.create({
  // transformResponse(data, headers) {
  //   console.log('hi!!')
  //   return Promise.resolve({ poop: "town" });
  // },
});

authios.interceptors.response.use((response) => {
  const { authorization } = response.headers;
  if (authorization) authios.defaults.headers.common.Authorization = authorization;
  return response;
}, (error) => {
  // We're looking for the error code "auth_token_invalid" from the server; that
  // means we can try refreshing the auth token. In all other cases, we'll just
  // reject with the error as usual.
  const code: string = error.response?.data?.error?.code || '';
  if (code !== 'auth_token_invalid') return Promise.reject(error);

  // We know it's an `AxiosError` at this point.
  const axiosError: AxiosError = error;
  // If there's no config to retry the request with... then we're SOL.
  if (!axiosError.config) return Promise.reject(error);

  // We'll try refreshing the auth token. If there's no ability to refresh (like
  // if we haven't logged in yet, or if the refresh token is expired), then
  // it'll run this handler again, but the code will not be "auth_token_invalid"
  // this time around and it'll bail right away.
  return axios.post('/auth/refresh').then((response) => {
    // Grab the token off of the "Authorization" header of the response...
    const { authorization } = response.headers;
    if (!authorization) return Promise.reject(error);

    // ...then set the default "Authorization" header to the received token for
    // future requests...
    authios.defaults.headers.common.Authorization = authorization;

    // ...then retry the request with the same config that was initially used!
    return authios(axiosError.config);
  });
});

// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
(window as any).authios = authios;

export default authios;
