import request from "./request";

export const getUserList = () => {
  return request({
    method: "get",
    url: "/api/permission/admins",
  });
};

export const getAdminTreeDate = () => {
  return request({
    method: "get",
    url: "/api/permission/admin/treeData",
  });
};

export const getUserPermission = (studentId, userId) => {
  return request({
    method: "get",
    url: "/api/permission/admin/user/list",
    params: {
      studentId: studentId,
      userId: userId,
    },
  });
};

export const addUserPermission = (userId, methodNames) => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  methodNames.forEach((name) => params.append("methodNames", name));

  return request({
    method: "post",
    url: "api/permission/admin",
    params: params,
  });
};

export const changeUserPermission = (userId, methodNames) => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  methodNames.forEach((name) => params.append("methodNames", name));

  return request({
    method: "put",
    url: "api/permission/admin",
    params: params,
  });
};
