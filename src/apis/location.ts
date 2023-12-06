import request from "./request";

export const getLocations = async () => {
  const response = await request({
    method: "get",
    url: "/admin/locations",
  });

  return response.data;
};
