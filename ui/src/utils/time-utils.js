import moment from 'moment'


const TIME_STRING_FORMAT = 'YYYY-MM-DDThh:mm:ssZ'
const OUTPUT_TIME_STRING_FORMAT = 'MMM Do YYYY, hh:mm A'
/**
 * 
 * @param {String} timeString in format - YYYY-MM-DDTHH:mm:ssZ
 */
export const getTimeFromTZString = (timeString) => {
  const time = moment(timeString, TIME_STRING_FORMAT)
  return time;
}

export const getFormatedTimeStringFromTime = (time) => {
  return moment(time).format(OUTPUT_TIME_STRING_FORMAT)
}

export const getFormatedTimeFromTZString = (timeString) => {
  return getFormatedTimeStringFromTime(getTimeFromTZString(timeString))
}