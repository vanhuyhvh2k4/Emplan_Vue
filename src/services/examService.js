import * as request from "@/utils/httpRequest";

export const getAllExams = async () => {
  const res = await request.get("exams");
  return res;
};

export const deleteExamById = async (examId) => {
  const res = await request.remove(`exams/${examId}`);
  return res;
};
