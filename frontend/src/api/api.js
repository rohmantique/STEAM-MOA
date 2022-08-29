import axios from "axios";

const defaultURL = "https://i7a303.p.ssafy.io/api/";

export const api = axios.create({
  baseURL: defaultURL,
});

export const apiAuth = axios.create({
  baseURL: defaultURL,
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
});


/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
apiAuth.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    try {
        config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (err) {
      console.error('[_axios.interceptors.request] config : ' + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);
