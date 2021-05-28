import clock from "clock";
import { preferences } from "user-settings";
import { days, months, monthsShort } from "../locales/en.js";

// Add zero in front of numbers < 10
const zeroPad = (i) => {
  if (i < 10) return "0" + i;
  return i;
}

export const initDateTimeService = ({ onUpdate, granularity, dateFormat }) => {
  
  const onTick = (evt) => {
    const today = evt.date;
    const dayName = days[today.getDay()];
    const month = zeroPad(today.getMonth() + 1);
    const monthName = months[today.getMonth()];
    const monthNameShort = monthsShort[today.getMonth()];
    const dayNumber = zeroPad(today.getDate());

    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
      // 24h format
      hours = zeroPad(hours);
    }
    const mins = zeroPad(today.getMinutes());

    const timeString = `${hours}:${mins}`;
    const dateString = today;

    switch(dateFormat) {
      case "shortDate":
        dateString = `${dayNumber} ${monthNameShort}`;
        break;
      case "mediumDate":
        dateString = `${dayNumber} ${monthName}`;
        break;
      case "longDate":
        dateString = `${dayName} ${monthName} ${dayNumber}`;
        break;
    }
    
    onUpdate({time: timeString, date: dateString});
  }
  
  // Only update as frequent as specified (better for battery)
  clock.granularity = granularity;
  
  // Start listening for ticks
  clock.addEventListener("tick", onTick);
 
  return () => {
    clock.removeEventListener("tick", onTick);
  }
}