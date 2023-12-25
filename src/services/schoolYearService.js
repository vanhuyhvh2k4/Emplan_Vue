import * as request from "@/utils/httpRequest";

export const getSchoolYear = async () => {
  const res = await request.get("school-years/get_all_school_years");
  return res;
};

export const getSchoolYearById = async (yearId) => {
  const res = await request.get(`school-years/${yearId}`);
  return res;
};

export const createSchoolYear = async (payload) => {
  const res = await request.post("school-years", payload);
  return res;
};

export const updateSchoolYear = async (yearId, payload) => {
  const res = await request.put(`school-years/${yearId}`, payload);
  return res;
};
