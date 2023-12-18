import * as request from "@/utils/httpRequest";

export const getClassList = async () => {
  const res = request.get("calendars/get_list_classes");
  return res;
};

export const getDetailClass = async (course_id) => {
  const res = request.get(`calendars/get_detail_class/${course_id}`);
  return res;
};
