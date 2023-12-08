import request from "../utils/request";

export const getSlide = async (current: number) => {
  const response = await request({
    method: "get",
    url: "/slide/home/list",
    params: {
      size: 10,
      current: current,
    },
  });

  return response.data;
};
