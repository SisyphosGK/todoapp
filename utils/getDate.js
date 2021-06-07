function getDateFromISO(date) {
  const utc = new Date(date).toUTCString();

  return `${new Date(utc).getDate()}.${new Date(utc).getMonth() + 1}.${new Date(
    utc,
  ).getFullYear()}`;
}

function getYesterdayYearFirst(date) {
  const utc = new Date(date).toUTCString();

  return `${new Date(utc).getFullYear()}-${`0${new Date(utc).getMonth() + 1}`.slice(-2)}-${
    new Date(utc).getDate() - 1
  }`;
}

function getTodayYearFirst(date) {
  const utc = new Date(date).toUTCString();

  return `${new Date(utc).getFullYear()}-${`0${new Date(utc).getMonth() + 1}`.slice(-2)}-${new Date(
    utc,
  ).getDate()}`;
}

function getTomorrowYearFirst(date) {
  const utc = new Date(date).toUTCString();

  return `${new Date(utc).getFullYear()}-${`0${new Date(utc).getMonth() + 1}`.slice(-2)}-${
    new Date(utc).getDate() + 1
  }`;
}

export { getDateFromISO, getYesterdayYearFirst, getTodayYearFirst, getTomorrowYearFirst };
