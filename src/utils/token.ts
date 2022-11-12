import jwt_decode, { JwtPayload } from "jwt-decode";

export const checkTokenExp = (token: string) => {
  let date = new Date().getTime() / 1000;
  let expToken = jwt_decode<JwtPayload>(token).exp;
  if (expToken && expToken > date) {
    return true;
  }
  return false;
};
