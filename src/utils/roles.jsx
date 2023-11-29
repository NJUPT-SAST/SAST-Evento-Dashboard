import request from "./request";

export const getUserList = () => {
  return request({
    method: "get",
    url: "/api/permission/admins",
  });
};
