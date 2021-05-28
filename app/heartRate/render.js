import document from "document";
import { display } from "display";

const label = document.getElementById("hrLabel");
const icon = document.getElementById("hrIcon");

// All possibilities listed at: https://dev.fitbit.com/build/reference/device-api/user-profile/
const zoneToColorMapping = {
  "out-of-range": "white",
  "fat-burn": "green",
  "cardio": "yellow",
  "peak": "red",
  "below-custom": "white",
  "custom": "green",
  "above-custom": "red"
}

let lastData = { bpm: 60, zone: "out-of-range" };
let tick = true;
let timeoutId = null;

const update = () => {
  // Render
  label.text = `${lastData.bpm}`;
  label.style.fill = zoneToColorMapping[lastData.zone];
  icon.href = tick ? `heart_open.png` : `heart_solid.png`
  
  // Invert tick / tock for next update
  tick = !tick;
  
  // Beat faster depending on the BPM
  const bpm = lastData.bpm ?? 60;
  const ms = Math.min((60/bpm) * 1000, 10000);
  timeoutId = setTimeout(update, ms);
}

update();

display.addEventListener("change", () => {
  if (display.on) {
    if (timeoutId == null)
      update();
  }
  else {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    } 
  }
}); 

export const updateHeartRateData = (data) => {
  lastData = data;
}



