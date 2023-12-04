import request from "./request";

export const getDepartments = async () => {
  const response = await request({
    method: "get",
    url: "/admin/departments",
  });

  return response.data;
};
