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
