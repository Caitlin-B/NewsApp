import moment from 'moment';

export function formatDate(dateString, length) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }
  
  if(length === "short") {
    return parsed.format('D MMM YYYY');
  } 

  if(length === "long") {
    return parsed.format('Do MMMM YYYY')
  }
}