import request from "./request";

export const linkLogin = async (code, type = 1) => {
  let data = new FormData();
  data.append('code', code);
  data.append('type', type.toString());
  const response = await request.post("/api/user/login/link", data, {
    headers: { "Content-Type": "multipart/form-data;" }
  });
  return response.data;
}