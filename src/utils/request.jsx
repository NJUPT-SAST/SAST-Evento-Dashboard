import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjIwNjEzNDc2MDAsInVzZXIiOiJ7XCJpZFwiOlwiMTcyNzMwNTM5Njk1NzM2NDIyNVwiLFwic3R1ZGVudElkXCI6XCJiMjIwNTAxMDZcIixcImVtYWlsXCI6XCJiMjIwNTAxMDZAbmp1cHQuZWR1LmNuXCJ9In0.q_u6h79cZegxB2yy30FxXvqvQLHe3TdeP0eHqgDLcYM";
var request = axios.create({
  baseURL: "https://evento.sast.fun/",
  // withCredentials:true,
  headers: {
    token: token,
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
      window.location.replace("/login");
    return response;
  },
  (error) => {
    Toast.error(error?.response?.data?.errMsg || "服务端异常");
    return Promise.reject(error);
  }
);

export default request;
