import request from "./request";
import moment from "moment";

//发起活动
export const postEvent = (value) => {
  const departments = value.departments.map((item) => {
    return { id: item };
  });
  console.log(value);
  return request({
    method: "post",
    url: "/api/event/info",
    data: {
      title: value.title,
      description: value.description,
      typeId: value.typeId,
      locationId: Number(value.locationId),
      tag: value.tag,
      departments: departments,
      gmtEventStart: moment(value.EventTime[0]).format("YYYY-MM-DD HH:mm:ss"),
      gmtEventEnd: moment(value.EventTime[1]).format("YYYY-MM-DD HH:mm:ss"),
      gmtRegistrationStart: moment(value.RegistrationTime[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      gmtRegistrationEnd: moment(value.RegistrationTime[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    },
  });
};

//获取活动
export const getEvent = (page) => {
  return request({
    method: "get",
    url: "/api/event/list",
    params: {
      page: page,
      size: 10,
    },
  });
};

//删除活动
export const deleteEvent = (value) => {
  return request({
    method: "delete",
    url: "/api/event/info",
    headers: {
      //token:token
    },
    params: {
      eventId: value,
    },
  });
};

//取消活动
export const patchEvent = (value) => {
  return request({
    method: "patch",
    url: "/api/event/info",
    headers: {
      //token:token
    },
    params: {
      eventId: value,
    },
    data: {
      id: value,
    },
  });
};

//修改活动
export const putEvent = (id, value, location) => {
  const departments = value.departments.map((item) => {
    return { id: item };
  });
  return request({
    method: "put",
    url: "/api/event/info",
    headers: {
      //token:token
    },
    params: { eventId: id },
    data: {
      id: id,
      title: value.title,
      description: value.description,
      typeId: value.typeId,
      locationId: location,
      tag: value.tag,
      state: Number(value.state),
      departments: departments,
      gmtEventStart: moment(value.EventTime[0]).format("YYYY-MM-DD HH:mm:ss"),
      gmtEventEnd: moment(value.EventTime[1]).format("YYYY-MM-DD HH:mm:ss"),
      gmtRegistrationStart: moment(value.RegistrationTime[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      gmtRegistrationEnd: moment(value.RegistrationTime[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    },
  });
};

//获取活动二维码
export const authCode = (id) => {
  return request({
    method: "get",
    url: "/api/event/authcode",
    params: {
      eventId: id,
    },
  });
};

//获取活动管理者列表
export const getManagers = (eventId) => {
  return request({
    method: "get",
    url: "/api/permission/event/managers",
    params: {
      eventId: eventId,
    },
  });
};

//修改活动管理者权限
export const putManagers = (id, value) => {
  return request({
    method: "put",
    url: "/api/permission/event/manager",
    params: {
      eventId: id,
    },
    data: {
      value,
    },
  });
};

//添加活动管理者
export const addManagers = (id, userId, methodNames) => {
  const formDate = new FormData();
  formDate.append("userId", userId);
  formDate.append("methodNames", methodNames);
  return request({
    method: "post",
    url: "/api/permission/event/manager",
    params: {
      eventId: id,
    },
    data: formDate,
  });
};

//获取活动权限列表
export const manageTreeData = (id) => {
  return request({
    method: "get",
    url: "/api/permission/manager/treeData",
    params: {
      eventId: id,
    },
  });
};

//获取获取用户的活动权限
export const managerUserList = (id, userId) => {
  return request({
    method: "get",
    url: "/api/permission/event/manager/user/list",
    params: {
      eventId: id,
      userId: userId,
    },
  });
};

//删除活动权限管理者
export const deleteEventManager = (id, userId) => {
  return request({
    method: "delete",
    url: "/api/permission/event/manager",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      eventId: id,
    },
    data: { userId },
  });
};
