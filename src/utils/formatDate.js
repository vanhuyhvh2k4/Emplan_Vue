const formatDate = function (date, from = "yyyy-mm-dd", to = "dd/mm/yyyy") {
  if (from === "yyyy-mm-dd" && to === "dd/mm/yyyy") {
    var dayMonthYear = date.split("-");
    return dayMonthYear[2] + "/" + dayMonthYear[1] + "/" + dayMonthYear[0];
  }
};

export default formatDate;
