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

export const patchSlide = async (
  url: string,
  link: string,
  title: string,
  slideId: string
) => {
  const formData = new FormData();
  formData.append("url", url);
  formData.append("link", link);
  formData.append("title", title);
  formData.append("slideId", slideId);

  const response = await request({
    method: "patch",
    url: "slide/home/info",
    data: formData,
  });

  return response.data;
};

export const deleteSlide = async (slideId: string) => {
  const formData = new FormData();
  formData.append("slideId", slideId);

  const response = await request({
    method: "delete",
    url: "slide/home/info",
    data: formData,
  });

  return response.data;
};

export const addSlide = async (
  url: string | undefined,
  link: string,
  title: string
) => {
  if (url !== undefined) {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("link", link);
    formData.append("title", title);

    const response = await request({
      method: "post",
      url: "slide/home/info",
      data: formData,
    });

    return response.data;
  }
};
