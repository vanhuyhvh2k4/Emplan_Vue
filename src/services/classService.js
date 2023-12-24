import * as request from "@/utils/httpRequest";

export const getClassList = async () => {
  const res = request.get("calendars/get_list_classes");
  return res;
};

export const getListClasses = async (...options) => {
  const res = request.get("schedules/get_class_list", ...options);
  return res;
};

export const createClass = async (payload) => {
  const res = await request.post("schedules/store_class", payload);
  return res;
};

export const getDetailClass = async (course_id) => {
  const res = request.get(`calendars/get_detail_class/${course_id}`);
  return res;
};
