import * as request from "@/utils/httpRequest";

export const getAllExams = async () => {
  const res = await request.get("exams");
  return res;
};

export const getExamsByCourseId = async (courseId) => {
  const res = await request.get(`tasks/get_exams_by_course/${courseId}`);
  return res;
};

export const createNewExam = async (payload) => {
  const res = await request.post("exams", payload);
  return res;
};

export const updateExam = async (examId, payload) => {
  const res = await request.put(`exams/${examId}`, payload);
  return res;
};

export const deleteExamById = async (examId) => {
  const res = await request.remove(`exams/${examId}`);
  return res;
};
