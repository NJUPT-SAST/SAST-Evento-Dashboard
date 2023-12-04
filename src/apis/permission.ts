import request from "./request";

export const getAdminsList = async (current: number, size: number) => {
  const response = await request({
    method: "get",
    url: "/permission/admins",
    params: {
      current: current,
      size: size,
    },
  });

  return response.data;
};

export const getUserPermission = async (studentId: string, userId: string) => {
  const response = await request({
    method: "get",
    url: "/permission/admin/user/list",
    params: {
      studentId: studentId,
      userId: userId,
    },
  });

  return response.data;
};

export const getAdminTreeDate = async () => {
  const response = await request({
    method: "get",
    url: "/permission/admin/treeData",
  });

  return response.data;
};

export const changeUserPermission = async (
  userId: string,
  methodNames: Array<string>
) => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  methodNames.forEach((name) => params.append("methodNames", name));

  const response = await request({
    method: "put",
    url: "/permission/admin",
    params: params,
  });

  return response.data;
};
