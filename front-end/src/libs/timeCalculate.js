export const timeCalculating = (cDate) => {
  const createdAt = new Date(cDate);

  const createdTime = createdAt.getTime();

  const currentTime = new Date().getTime();
  const timeCalculate = currentTime - createdTime;

  // -----------------------------

  if (timeCalculate > 0 && timeCalculate < 60000) {
    return "Just now";
  }

  // -----------------------------

  if (timeCalculate > 60000 && timeCalculate < 3.6e6) {
    const calculateMinuites = timeCalculate / 60000;

    const actualMinuites = Math.round(calculateMinuites);

    return `${actualMinuites} Minute ago `;
  }

  // -------------------------------

  if (timeCalculate > 3.6e6 && timeCalculate < 8.64e7) {
    const calculateHour = timeCalculate / 3.6e6;

    const actualHour = Math.round(calculateHour);

    return ` ${actualHour} hour ago`;
  }

  // --------------------------------

  if (timeCalculate > 8.64e7 && timeCalculate < 2.592e9) {
    const calculatDay = timeCalculate / 8.64e7;

    const actualDay = Math.round(calculatDay);
    return `${actualDay} Day ago`;
  }

  // --------------------------------

  if (timeCalculate > 2.592e9 && timeCalculate < 3.154e10) {
    const calculateMonth = timeCalculate / 2.592e9;

    const actualMonth = Math.round(calculateMonth);
    return `${actualMonth} month ago`;
  }

  // --------------------------------

  if (timeCalculate > 3.154e10) {
    const calculateYear = timeCalculate / 3.154e10;

    const actualYear = Math.round(calculateYear);
    return `${actualYear} Year ago`;
  }
};
