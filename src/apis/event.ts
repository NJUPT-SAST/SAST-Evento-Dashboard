import request from "./request";

export const getEventsList = async (
  typeId: string,
  departmentId: string,
  time: string
) => {
  const formData = new FormData();
  formData.append("typeId", typeId);
  formData.append("departmentId", departmentId);
  formData.append("time", time);

  const response = await request({
    method: "post",
    url: "/event/list",
    data: formData,
  });

  return response.data;
};

export const getEvent = async (page: number, size: number) => {
  const response = await request({
    method: "get",
    url: "/event/list",
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};

export const authCode = async (eventId: number) => {
  const response = await request({
    method: "get",
    url: "/event/authcode",
    params: {
      eventId: eventId,
    },
  });

  return response.data;
};
