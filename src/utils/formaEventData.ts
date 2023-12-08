import { getEventData, eventData } from "./commonInterface";

const formaEventData = (value: getEventData | undefined) => {
  if (typeof value === "undefined") {
    return null;
  }
  const newValue: eventData = {
    title: value.title,
    description: value.description,
    typeId: value.typeId,
    locationId: Number(value.locationId),
    tag: value.tag,
    departments: value.departments,
    gmtEventStart: formatDateString(value.EventTime[0]),
    gmtEventEnd: formatDateString(value.EventTime[1]),
    gmtRegistrationStart: formatDateString(value.RegistrationTime[0]),
    gmtRegistrationEnd: formatDateString(value.RegistrationTime[1]),
  };

  return newValue;
};

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default formaEventData;
