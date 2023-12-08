import request from "../utils/request";

export const getTypes = async () => {
  const response = await request({
    method: "get",
    url: "/admin/types",
  });

  return response.data;
};

export const changeType = async (
  id: number,
  typeName: string,
  allowConflict: boolean
) => {
  const response = await request({
    method: "put",
    url: "/admin/type",
    data: {
      id,
      typeName,
      allowConflict,
    },
  });

  return response.data;
};

export const deleteType = async (typeId: number) => {
  const response = await request({
    method: "delete",
    url: "/admin/type",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      typeId: typeId,
    },
  });

  return response.data;
};

export const addType = async (typeName: string, allowConflict: boolean) => {
  const response = await request({
    method: "post",
    url: "/admin/type",
    data: {
      typeName: typeName,
      allowConflict: allowConflict,
    },
  });

  return response.data;
};
