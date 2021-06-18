import axios from 'axios';

function axiosHTTP() {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error && error.response ) {
        return error.response;
      } else {
        return Promise.reject(error);
      }
    },
  );
  return instance;
};

export default axiosHTTP();
