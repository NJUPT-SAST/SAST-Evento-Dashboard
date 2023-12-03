import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";

const request = axios.create({
  baseURL: "https://evento.sast.fun/api",

  headers: {
    token: localStorage.getItem("token"),
  },
  timeout: 30000,
});

// TODO: use error code to replace error message
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.success === false) {
      Toast.error(data.errMsg);
    }
    const { errMsg } = data;
    if (errMsg === "token错误" || errMsg === "token过期")
      window.location.href = "/console/login";
    return response;
  },
  (error) => {
    Toast.error(error?.response?.data?.errMsg || "服务端异常");
    return Promise.reject(error);
  }
);

export default request;
