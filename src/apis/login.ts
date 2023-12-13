import request from "../utils/request";

export const linkLogin = async (code: string, type = 1) => {
  let data = new FormData();
  data.append("code", code);
  data.append("type", type.toString());
  const response = await request.post("/user/login/link", data, {
    headers: { "Content-Type": "multipart/form-data;" },
  });
  return response.data;
};

export const passwordLogin = async (studentId: string, password: string) => {
  const formDate = new FormData();
  formDate.append("studentId", studentId);
  formDate.append("password", password);
  const response = await request.post("/user/login/password", formDate, {
    headers: { "Content-Type": "multipart/form-data;" },
  });

  return response.data;
};
