import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";

var request = axios.create({
  baseURL: "https://evento.sast.fun/",
  // withCredentials:true,
  headers: {
    token: localStorage.getItem("token"),
  },
  timeout: 30000,
});

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
