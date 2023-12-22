const compareDate = function (firstTime, secondTime) {
  const newFirstTime = new Date(firstTime).getTime();
  const newSecondTime = new Date(secondTime).getTime();

  if (newFirstTime > newSecondTime) return "greater";
  if (newFirstTime < newSecondTime) return "less";
  if (newFirstTime === newSecondTime) return "equal";
};

export default compareDate;
