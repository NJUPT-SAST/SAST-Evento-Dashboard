import request from "./request";

export const getSlide = (current) => {
  return request({
    method: "get",
    url: "/api/slide/home/list",
    params: {
      size: 8,
      current: current,
    },
  });
};

export const deleteSlide = (slideId) => {
  const formData = new FormData();
  formData.append("slideId", slideId);

  return request({
    method: "delete",
    url: "api/slide/home/info",
    data: formData,
  });
};
