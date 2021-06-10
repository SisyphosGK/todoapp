/* eslint-disable prettier/prettier */
function makeDoubleInteger(date) {
  return (`0${date}`).slice(-2)
}

function getDateFromISO(UTCDate) {
  const utc = (new Date(UTCDate)).toUTCString()

  return `${makeDoubleInteger(new Date(utc).getDate())}.${makeDoubleInteger(new Date(utc).getMonth() + 1)}.${new Date(utc).getFullYear()}.${makeDoubleInteger(new Date(utc).getHours())}`
}

function getDateFromISOWithHourAndMinute(UTCDate) {
  const utc = (new Date(UTCDate)).toUTCString()

  return `${makeDoubleInteger(new Date(utc).getDate())}.${makeDoubleInteger(new Date(utc).getMonth() + 1)}.${new Date(utc).getFullYear()} - ${makeDoubleInteger(new Date(utc).getHours())}:${makeDoubleInteger(new Date(utc).getMinutes())}`
}

function getYesterdayYearFirst(UTCDate) {
  const utc = new Date((new Date(UTCDate)).valueOf() - 1000 * 60 * 60 * 24)

  return `${new Date(utc).getFullYear()}-${makeDoubleInteger(new Date(utc).getMonth() + 1)}-${makeDoubleInteger(new Date(utc).getDate())}`
}

function getTodayYearFirst(UTCDate) {
  const utc = (new Date(UTCDate)).toUTCString()

  return `${new Date(utc).getFullYear()}-${makeDoubleInteger(new Date(utc).getMonth() + 1)}-${makeDoubleInteger(new Date(utc).getDate())}`
}

function getTomorrowYearFirst(UTCDate) {
  const utc = (new Date(UTCDate)).toUTCString()

  return `${new Date(utc).getFullYear()}-${makeDoubleInteger(new Date(utc).getMonth() + 1)}-${makeDoubleInteger(new Date(utc).getDate() + 1)}`
}

export {
  getDateFromISO, getDateFromISOWithHourAndMinute, getYesterdayYearFirst, getTodayYearFirst, getTomorrowYearFirst,
}
