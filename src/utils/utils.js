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

export const leapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const verifyDate = (day, month, year) => {
  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

  if (
    (month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12) &&
    day > 0 &&
    day <= 31 &&
    year > 1900 &&
    year <= new Date().getFullYear()
  ) {
    return true;
  } else if (
    (month === 4 || month === 6 || month === 9 || month === 11) &&
    day > 0 &&
    day <= 30 &&
    year > 1900 &&
    year <= new Date().getFullYear()
  ) {
    return true;
  } else if (month === 2) {
    let maxDay = 28;
    if (leapYear(year)) {
      maxDay++;
    }

    if (
      day > 0 &&
      day <= maxDay &&
      year > 1900 &&
      year <= new Date().getFullYear()
    ) {
      return true;
    }
  } else {
    return false;
  }
};

export const toTitleCase = (text) => {
  let newText = "";
  const newTextList = text.split(" ");

  for (let i = 0; i < newTextList.length; i++) {
    const titleWord = `${newTextList[i].slice(0, 1).toUpperCase()}${newTextList[
      i
    ]
      .slice(1, newTextList[i].length)
      .toLowerCase()}`;

    if (i === 0) {
      newText = `${titleWord}`;
    } else {
      newText = `${newText} ${titleWord}`;
    }
  }

  return newText;
};

export const sortObj = (obj) => {
  let sortedList = [];
  for (let item in obj) {
    if (!obj[item].number) {
      sortedList.push([item, obj[item]]);
    }
  }
  return sortedList.sort((a, b) => b[1].date - a[1].date);
};

export const saveSession = (state) => {
  window.sessionStorage.setItem("loggin", JSON.stringify(state));
};

export const removeSession = () => {
  window.sessionStorage.removeItem("loggin");
};
