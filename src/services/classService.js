import * as request from "@/utils/httpRequest";

export const getClassList = async () => {
  const res = await request.get("calendars/get_list_classes");
  return res;
};

export const getListClasses = async (options) => {
  const res = await request.get("schedules/get_class_list", options);
  return res;
};

export const createClass = async (payload) => {
  const res = await request.post("schedules/store_class", payload);
  return res;
};

export const getDetailClass = async (classId) => {
  const res = await request.get(`calendars/get_detail_class/${classId}`);
  return res;
};

export const updateClass = async (classId, payload) => {
  const res = await request.put(`calendars/update_class/${classId}`, payload);
  return res;
};

export const deleteClass = async (classId) => {
  const res = await request.remove(`calendars/destroy_class/${classId}`);
  return res;
};
