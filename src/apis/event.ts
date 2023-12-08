import { log } from "util";
import request from "../utils/request";
import { eventData } from "@/utils/commonInterface";

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

export const postEvent = async (eventDate: eventData) => {
  console.log(eventDate);
  const departments = eventDate.departments.map((item) => {
    return { id: item };
  });
  const response = await request({
    method: "post",
    url: "/event/info",
    data: {
      title: eventDate.title,
      description: eventDate.description,
      typeId: eventDate.typeId,
      locationId: eventDate.locationId,
      tag: eventDate.tag,
      departments: departments,
      gmtEventStart: eventDate.gmtEventStart,
      gmtEventEnd: eventDate.gmtEventEnd,
      gmtRegistrationStart: eventDate.gmtRegistrationStart,
      gmtRegistrationEnd: eventDate.gmtRegistrationEnd,
    },
  });

  return response.data;
};

export const putEvent = async (eventId: number, eventDate: eventData) => {
  console.log(eventDate);
  const departments = eventDate.departments.map((item) => {
    return { id: item };
  });
  const response = await request({
    method: "put",
    url: "/event/info",
    params: {
      eventId: eventId,
    },
    data: {
      id: eventId,
      title: eventDate.title,
      description: eventDate.description,
      typeId: eventDate.typeId,
      locationId: eventDate.locationId,
      tag: eventDate.tag,
      departments: departments,
      gmtEventStart: eventDate.gmtEventStart,
      gmtEventEnd: eventDate.gmtEventEnd,
      gmtRegistrationStart: eventDate.gmtRegistrationStart,
      gmtRegistrationEnd: eventDate.gmtRegistrationEnd,
    },
  });

  return response.data;
};
