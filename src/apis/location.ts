import request from "./request";

export const getLocations = async () => {
  const response = await request({
    method: "get",
    url: "/admin/locations",
  });

  return response.data;
};

export const postLocation = async (locationName: string, parentId: number) => {
  const response = await request({
    method: "post",
    url: "/admin/location",
    data: {
      locationName,
      parentId,
    },
  });

  return response.data;
};

export const changeLocation = async (id: number, locationName: string) => {
  const response = await request({
    method: "patch",
    url: "/admin/location",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      id,
      locationName,
    },
  });

  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await request({
    method: "delete",
    url: "/admin/location",
    params: {
      locationId: id,
    },
  });

  return response.data;
};
