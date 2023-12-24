import * as request from "@/utils/httpRequest";

export const createSemester = async (payload) => {
  const res = await request.post("schedules/store_semester", payload);
  return res;
};
