import * as request from "@/utils/httpRequest";

export const getAllCourse = async () => {
  const res = await request.get("tasks/get_courses");
  return res;
};

export const getClassExam = async () => {
  const res = await request.get("dashboard/get_classes_exams");
  return res;
};

export const createCourse = async (payload) => {
  const res = await request.post("schedules/store_course", payload);
  return res;
};
