import request from "./request";

export const getDepartments = async () => {
  const response = await request({
    method: "get",
    url: "/admin/departments",
  });

  return response.data;
};

export const putDepartment = async (
  departmentId: number,
  departmentName: string
) => {
  const response = await request({
    url: "/admin/department",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      departmentId: departmentId,
      departmentName: departmentName,
    },
  });

  return response.data;
};

export const deleteDepartment = async (departmentId: number) => {
  const response = await request({
    url: "/admin/department",
    method: "delete",
    params: {
      departmentId: departmentId,
    },
  });

  return response.data;
};
