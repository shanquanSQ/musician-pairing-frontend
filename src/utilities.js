export const timeConversion = (utcDateString) => {
    const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
    const utcDate = new Date(utcDateWithoutMillis);
    const utcTime = new Date(utcDate.getTime());
    const dayIndex = utcTime.getDay()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayText = days[dayIndex].slice(0,3)
    const dateOptions = {
      dateStyle: "short",
      timeStyle: "short",
    }
    return dayText + ' ' + utcTime.toLocaleString("en-GB", dateOptions)
  }