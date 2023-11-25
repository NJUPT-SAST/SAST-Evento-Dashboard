import request from "./request";

export const getPictureList = (dir, num,size) => {
  return request({
    method: "get",
    url: "/api/picture/list",
    params: {
      size: size,
      num: num,
      dir: dir,
    },
  });
};

export const addPictureList = (picture, dir) => {
  
  const formData = new FormData();
  formData.append("picture", picture);
  formData.append("dir", dir);

  return request({
    method: "post",
    url: "/api/picture/info",
    data: formData,
  });
};


export const deletePictureList = (key, dir) => {
  return request({
    method: "delete",
    url: "/api/picture/info",
    params: {
      key: key,
      dir: dir,
    },
  });
};
