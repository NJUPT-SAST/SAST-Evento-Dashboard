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

export const getManagers = async (eventId: number) => {
  const response = await request({
    method: "get",
    url: "/permission/event/managers",
    params: {
      eventId: eventId,
    },
  });

  return response.data;
};

//TODO:修改请求未做，需要与后端交流，接口出现问题

// export const putEvent = (id, value, location) => {
//   const departments = value.departments.map((item) => {
//     return { id: item };
//   });
//   return request({
//     method: "put",
//     url: "/event/info",
//     params: { eventId: id },
//     data: {
//       id: id,
//       title: value.title,
//       description: value.description,
//       typeId: value.typeId,
//       locationId: location,
//       tag: value.tag,
//       state: Number(value.state),
//       departments: departments,
//       // gmtEventStart: moment(value.EventTime[0]).format("YYYY-MM-DD HH:mm:ss"),
//       // gmtEventEnd: moment(value.EventTime[1]).format("YYYY-MM-DD HH:mm:ss"),
//       // gmtRegistrationStart: moment(value.RegistrationTime[0]).format(
//       //   "YYYY-MM-DD HH:mm:ss"
//       // ),
//       // gmtRegistrationEnd: moment(value.RegistrationTime[1]).format(
//       //   "YYYY-MM-DD HH:mm:ss"
//       // ),
//     },
//   });
// };

export const deleteEvent = async (eventId: number) => {
  const response = await request({
    method: "delete",
    url: "/event/info",
    params: {
      eventId: eventId,
    },
  });

  return response.data;
};

export const cancelEvent = async (eventId: number) => {
  const response = await request({
    method: "patch",
    url: "/event/info",
    params: {
      eventId: eventId,
    },
    data: {
      id: eventId,
    },
  });

  return response.data;
};
