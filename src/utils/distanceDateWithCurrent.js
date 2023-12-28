const distanceDateWithCurrent = function (date) {
  let currentDate = new Date();
  let paramsDate = new Date(date);
  let currentMili = currentDate.getTime();
  let dateMili = paramsDate.getTime();
  let distanceMili = dateMili - currentMili;
  let distanceDay = Math.floor(distanceMili / (1000 * 60 * 60 * 24)) + 1;
  return distanceDay;
};

export default distanceDateWithCurrent;
