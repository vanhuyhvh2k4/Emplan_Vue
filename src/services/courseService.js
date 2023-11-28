import courseApi from "@/tests/courses/courseApi";
import * as request from "@/utils/httpRequest";

export const getAllCourse = () => {
  return courseApi.getAllCourse;
};

export const getCourseToday = async () => {
  const res = await request.get("dashboard/get_classes_exams");
  return res;
};
