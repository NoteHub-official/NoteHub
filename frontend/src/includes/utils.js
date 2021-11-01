export function unixTimeToDate(unixTime) {
  const publishTime = new Date(parseInt(unixTime));
  const currTime = new Date(Math.round(Date.now()));

  const year = currTime.getYear() - publishTime.getYear();
  const month = currTime.getMonth() - publishTime.getMonth();
  const day = currTime.getDay() - publishTime.getDay();
  const hour = currTime.getHours() - publishTime.getHours();
  const min = currTime.getMinutes() - publishTime.getMinutes();
  const sec = currTime.getSeconds() - publishTime.getSeconds();
  // console.log(date);
  if (year && year !== 0) return `${year} year ago`;
  if (month && month !== 0) return `${month} month ago`;
  if (day && day !== 0) return `${day} day ago`;
  if (hour && hour !== 0) return `${hour} hour ago`;
  if (min && min !== 0) return `${min} minute ago`;
  return `${sec} seconds ago`;
}

export function getRandomColor() {
  const colors = [
    "#feca57",
    "#fa983a",
    "#38ada9",
    "#2e86de",
    "#ee5253",
    "#2ed573",
    "#FDA7DF",
    "#26c6da",
  ];
  // choose a random color from the array
  return colors[Math.floor(Math.random() * colors.length)];
}
