import request from "@/config/axios.config";

export const get = async (path, options = {}) => {
  const res = await request.get(path, options);
  return res.data;
};

export const post = async (path, options = {}, config = {}) => {
  const res = await request.post(path, options, config);
  return res;
};

export const patch = async (path, options = {}, config = {}) => {
  const res = await request.patch(path, options, config);
  return res;
};

export const remove = async (path) => {
  const res = await request.delete(path);
  return res.data;
};
