import taskApi from "@/tests/tasks/taskApi";
import * as request from "@/utils/httpRequest.js";

export const getAllTask = () => {
  return taskApi.getAllTask;
};

export const getTaskByCourse = () => {
  return taskApi.getTaskByCourse;
};

export const getTodayTaskDetail = async () => {
  const res = await request.get("dashboard/get_today_detail");

  return res;
};
