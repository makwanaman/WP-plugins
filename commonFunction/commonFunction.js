export default function commonFunction(data) {
  const date = new Date(data * 1000).toISOString().substring(0, 10);

  const data1 = date.toString();
  const data2 = new Date(data1);
  const dataFound = data2.toString().split(" ");
  let formatDate = `${dataFound[2]}-${dataFound[1]}-${dataFound[3]}`;

  return formatDate;
}
export const getTimeDifference = (startDates) => {
  let dataDate = String(startDates).split(" ")[0];
  const startDate = new Date(dataDate);
  const endDate = new Date();

  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const oneMonth = 30.4375 * oneDay; // average number of days in a month

  const timeDiff = endDate.getTime() - startDate.getTime(); // difference in milliseconds
  const daysDiff = Math.round(timeDiff / oneDay); // difference in days
  const monthsDiff = Math.round(timeDiff / oneMonth); // difference in months
  const yearsDiff = Math.round(monthsDiff / 12); // difference in years

  if (daysDiff < 31) {
    return daysDiff + " days ago";
  } else if (monthsDiff < 12) {
    return monthsDiff + " months ago";
  } else {
    return yearsDiff + " years ago";
  }
};
