var timestamp = new Date().getTime();
var date_not_formatted = new Date(timestamp);
var date_today = date_not_formatted.getFullYear() + "-";
if (date_not_formatted.getMonth() < 9) {
  date_today += "0";
}
date_today += date_not_formatted.getMonth() + 1;
date_today += "-";
if (date_not_formatted.getDate() < 10) {
  date_today += "0";
}
date_today += date_not_formatted.getDate();

var today = new Date();
var lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

var date_not_formatted = new Date(lastWeek);
var date_lastweek = date_not_formatted.getFullYear() + "-";
if (date_not_formatted.getMonth() < 9) {
  date_lastweek += "0";
}
date_lastweek += date_not_formatted.getMonth() + 1;
date_lastweek += "-";
if (date_not_formatted.getDate() < 10) {
  date_lastweek += "0";
}
date_lastweek += date_not_formatted.getDate();

// console.log("slt", date_lastweek)
// console.log(date_today);

export {date_lastweek}
export {date_today}