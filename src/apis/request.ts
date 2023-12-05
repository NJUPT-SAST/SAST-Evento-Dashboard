import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";

//开发时临时用的token，正式运行时，从localStorage中获取
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjIwNjE3NzgwOTAsInVzZXIiOiJ7XCJpZFwiOlwiMTcyNzMwNTM5Njk1NzM2NDIyNVwiLFwic3R1ZGVudElkXCI6XCJiMjIwNTAxMDZcIixcImVtYWlsXCI6XCJiMjIwNTAxMDZAbmp1cHQuZWR1LmNuXCJ9In0.DGF4mj-nb7OepQgHYJm46Lr1ZXRrbWJMuCn-a4HdLo8";

  const request = axios.create({
  baseURL: "https://evento.sast.fun/api",

  headers: {
    // token: localStorage.getItem("token"),
    token: token,
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
