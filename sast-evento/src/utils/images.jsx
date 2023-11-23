import request from "./request";

export const getPicturelist = (dir, num) => {
  return request({
    method: "get",
    url: "/api/picture/list",
    params: {
      size: 10,
      num: num,
      dir: dir,
    },
  });
};

export const addPicturelist = (picture, dir) => {
    const formData = new FormData();
    // 将picture文件添加到FormData中
    formData.append("picture", picture);
    // 添加其他参数
    formData.append("dir", dir);
  return request({
    method: "post",
    url: "/api/picture/info",
    data: {
      picture: picture,
      dir: dir,
    },
  });
};
