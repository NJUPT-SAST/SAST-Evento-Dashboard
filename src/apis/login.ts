import request from "./request";

export const linkLogin = async (code: string, type = 1) => {
  let data = new FormData();
  data.append("code", code);
  data.append("type", type.toString());
  const response = await request.post("/user/login/link", data, {
    headers: { "Content-Type": "multipart/form-data;" },
  });
  return response.data;
};
