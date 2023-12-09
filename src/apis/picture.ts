import request from "../utils/request";

export const addPictureList = async (picture: File, dir: string) => {
  const formData = new FormData();
  formData.append("picture", picture);
  formData.append("dir", dir);
  const response = await request({
    method: "post",
    url: "/picture/info",
    data: formData,
  });

  return response.data;
};

export const deletePictureList = async (key: string, dir: string) => {
  const response = await request({
    method: "delete",
    url: "/picture/info",
    params: {
      key: key,
      dir: dir,
    },
  });
  return response.data;
};

export const getPictureDir = async () => {
  const response = await request({
    method: "get",
    url: "/picture/dir",
  });
  return response.data;
};

export const getPictureList = async (
  dir: string,
  num: number,
  size: number
) => {
  const response = await request({
    method: "get",
    url: "/picture/list",
    params: {
      size: size,
      num: num,
      dir: dir,
    },
  });
  return response.data;
};
