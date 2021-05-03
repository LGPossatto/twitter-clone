export const toUTC = (date) => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const getMonthName = (month) => {
  const monthList = [
    "January",
    "Februery",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthList[month];
};

export const getMonthAndDay = (date) => {
  const localDate = new Date(date);

  return `${getMonthName(localDate.getMonth())}
      ${" "}${localDate.getFullYear()}`;
};

export const saveSession = (state) => {
  window.sessionStorage.setItem("loggin", JSON.stringify(state));
};

export const removeSession = () => {
  window.sessionStorage.removeItem("loggin");
};
