import * as request from "@/utils/httpRequest";

export const getSemesterBySchoolYearId = async (schoolYearId) => {
  const res = await request.get(
    `school-years/get_semesters_by_schoolYearId/${schoolYearId}`,
  );
  return res;
};

export const createSemester = async (payload) => {
  const res = await request.post("schedules/store_semester", payload);
  return res;
};

export const deleteSemester = async (semesterId) => {
  const res = await request.remove(`delete-semester/${semesterId}`);
  return res;
};
