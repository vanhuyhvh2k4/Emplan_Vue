import * as request from "@/utils/httpRequest";

export const getAllCourse = async (options) => {
  const res = await request.get("tasks/get_courses", options);
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

export const updateCourse = async (courseId, payload) => {
  const res = await request.put(`schedules/update_course/${courseId}`, payload);
  return res;
};

export const deleteCourse = async (courseId) => {
  const res = await request.remove(`schedules/destroy_course/${courseId}`);
  return res;
};
