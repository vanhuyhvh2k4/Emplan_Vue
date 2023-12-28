import taskApi from "@/tests/tasks/taskApi";
import * as request from "@/utils/httpRequest.js";

export const getAllTask = async () => {
  const res = await request.get("tasks");
  return res;
};

export const getTaskById = async (taskId) => {
  const res = await request.get(`tasks/${taskId}`);
  return res;
};

export const getTaskByCourse = () => {
  return taskApi.getTaskByCourse;
};

export const getTodayTaskDetail = async () => {
  const res = await request.get("dashboard/get_today_detail");

  return res;
};

export const getDueTask = async () => {
  const res = await request.get("dashboard/get_due_tasks");
  return res;
};

export const getOverdueTask = async () => {
  const res = await request.get("dashboard/get_overdue_tasks");
  return res;
};

export const createTask = async (payload) => {
  const res = await request.post("tasks", payload);
  return res;
};

export const updateTask = async (taskId, payload) => {
  const res = await request.put(`tasks/${taskId}`, payload);
  return res;
};

export const deleteTaskById = async (taskId) => {
  const res = await request.remove(`tasks/${taskId}`);
  return res;
};
