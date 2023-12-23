import * as request from "@/utils/httpRequest";

export const createSchoolYear = async (payload) => {
  const res = await request.post("school-years", payload);
  return res;
};
