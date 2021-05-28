import document from "document";
import { display } from "display";

const label = document.getElementById("batteryLabel");
const bar = document.getElementById("batteryBar");

let lastData = { chargeLevel: 0, hoursRemain: 0 };
let mouseDown = false;

const tapTarget = document.getElementById("tap-target");

tapTarget.addEventListener("mousedown", (evt) => {
  mouseDown = true;
  render(lastData);
})

tapTarget.addEventListener("mouseup", (evt) => {
  mouseDown = false;
  render(lastData);
});

display.addEventListener("change", () => mouseDown = false);

const stringifyHours = (hours) => {
  if (hours <= 1) return `Estimating..`;
  const days = hours / 24;
  if (days <= 1) return `${Math.floor(hours)} hrs`;
  return `${days.toFixed(1)} days`;
}

const render = (data) => {
  
  if (mouseDown){
    label.text = stringifyHours(data.hoursRemain); 
    label.style.fill = `white`
  }
  else {
    label.text = Math.floor(data.chargeLevel) + " %";
    label.style.fill = data.chargeLevel < 25 ? `red` : `white`
  }
    
  
  bar.height =  (data.chargeLevel / 100) * 11;
  bar.style.fill = data.chargeLevel < 25 ? `red` : `#FFA500`
}

export const setBatteryData = (data) => {
  lastData = data;
  render(data);
}