import request from "./request";

export const getEventsList = (typeId, departmentId, time) => {
  const formData = new FormData();
  formData.append("typeId", typeId);
  formData.append("departmentId", departmentId);
  formData.append("time", time);
  
  return request({
    method: "post",
    url: "api/event/list",
    data: formData,
  });
};
