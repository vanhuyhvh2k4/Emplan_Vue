import * as request from "@/utils/httpRequest";

export const getSchoolYear = async () => {
  const res = await request.get("school-years/get_all_school_years");
  return res;
};

export const createSchoolYear = async (payload) => {
  const res = await request.post("school-years", payload);
  return res;
};
