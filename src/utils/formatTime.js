const formatTime = function (time) {
  const arrTime = time.split(":");
  return arrTime[0] + ":" + arrTime[1];
};

export default formatTime;
