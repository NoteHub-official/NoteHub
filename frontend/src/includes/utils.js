export function unixTimeToDate(time) {
  const publishTime = new Date(parseInt(time));
  const currTime = new Date(Math.round(Date.now()));
  const diff = currTime.getTime() - publishTime.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffDays > 0) {
    return `${diffDays} days`;
  }
  if (diffHours > 0) {
    return `${diffHours} hours`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds`;
  }
  return "just now";
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
