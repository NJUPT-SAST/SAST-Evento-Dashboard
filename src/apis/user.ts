import request from "@/utils/request";

export const getMyInfo = async () => {
  const response = await request({
    method: "get",
    url: "/user/info",
  });

  return response.data;
};
