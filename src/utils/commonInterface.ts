export interface getEventData {
  EventTime: Array<string>;
  RegistrationTime: Array<string>;
  departments: Array<number>;
  description: string;
  state: number;
  tag: string;
  title: string;
  typeId: number;
  locationId: number;
}

export interface eventData {
  title: string;
  description: string;
  typeId: number;
  locationId: number;
  tag: string;
  departments: Array<number>;
  gmtEventStart: string;
  gmtEventEnd: string;
  gmtRegistrationStart: string;
  gmtRegistrationEnd: string;
}

export interface slideDate {
  id: number;
  title: string;
  link: string;
  url: string;
}

export interface pictureDate {
  cosDir: string;
  cosKey: string;
  extension: string;
  gmtUploadTime: string;
  id: number;
  name: string;
  size: number;
  uri: string;
  userId: string;
}
