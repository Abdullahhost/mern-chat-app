/* eslint-disable no-unused-vars */
export const dateFormat = (date) => {
  const mainData = new Date(date);

  let hour = mainData.getHours();
  let min = mainData.getMinutes();
  let bar = mainData.getDay();

  let month = mainData.getMonth();
  let getdate = mainData.getDate();

  let amPm = "am";
  if (hour > 12) {
    hour = hour - 12;

    amPm = "pm";
  }

  const createdAt = new Date(date);

  const createdTime = createdAt.getTime();

  const currentTime = new Date().getTime();
  const timeCalculate = currentTime - createdTime;

  if (timeCalculate > 0 && timeCalculate < 60000) {
    return "Just now";
  }

  if (timeCalculate > 60000 && timeCalculate < 8.64e7) {
    return hour + ":" + min + " " + amPm;
  }

  if (timeCalculate > 8.64e7 && timeCalculate < 1.728e8) {
    return `Yesterday ${hour + ":" + min + " " + amPm}`;
  }

  if (timeCalculate > 1.728e8 && timeCalculate < 6.048e8) {
    switch (bar) {
      case 0:
        bar = "Sunday";
        break;
      case 1:
        bar = "Monday";
        break;
      case 2:
        bar = "Tuesday";
        break;
      case 3:
        bar = "Wednesday";
        break;
      case 4:
        bar = "Thursday";
        break;
      case 5:
        bar = "Friday";
        break;
      case 6:
        bar = "Saturday";
    }
    return bar + ", " + hour + ":" + min + " " + amPm;
  }

  if (timeCalculate > 6.048e8 && timeCalculate < 3.154e10) {
    switch (month) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "Septembar";
        break;
      case 9:
        month = "Octobor";
        break;
      case 10:
        month = "Novembar";
        break;
      case 11:
        month = "Decembar";
        break;
    }
    return month + " " + getdate;
  }

  if (timeCalculate > 3.154e10) {
    const calculateYear = timeCalculate / 3.154e10;

    const actualYear = Math.round(calculateYear);
    return `${actualYear} Year ago`;
  }
};
