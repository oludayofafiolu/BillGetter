import axios from 'axios';

function axiosHTTP() {
  const instance = axios.create();

  instance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error && error.response ) {
        return  
      } else {
        return Promise.reject(error);
      }
    },
  );
  return instance;
};

export default axiosHTTP();
