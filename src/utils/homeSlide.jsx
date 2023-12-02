import request from "./request";

export const getSlide = (current) => {
  return request({
    method: "get",
    url: "/api/slide/home/list",
    params: {
      size: 10,
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

export const patchSlide = (url, link, title, slideId) => {
  const formData = new FormData();
  formData.append("url", url);
  formData.append("link", link);
  formData.append("title", title);
  formData.append("slideId", slideId);

  return request({
    method:"patch",
    url:"api/slide/home/info",
    data: formData,
  })
};

export const addSlide = (url,link,title) => {
  const formData = new FormData();
  formData.append("url",url);
  formData.append("link",link);
  formData.append("title",title);

  return request({
    method:"post",
    url:"api/slide/home/info",
    data:formData,
  })
}
