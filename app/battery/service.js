import { battery, charger } from "power";

export const createBatteryService = (onUpdate) => {
  
  let last = {level: battery.chargeLevel, time: Date.now()};
  let hoursRemain = -1;
  
   // If the battery starts charging changes then we should reset the last level
   charger.addEventListener("change",  () => {
      last = {level: battery.chargeLevel, time: Date.now()};
      hoursRemain = -1;
      onUpdate({ chargeLevel: battery.chargeLevel, hoursRemain });
   });
  
  const calculateHoursRemain = (level) => {
    const batteryDelta = last.level - level;
    const hoursDelta = (((Date.now() - last.time) / 1000) / 3600);
    const invRatio = 1 / (batteryDelta / 100);
    const totalEstimatedHours = invRatio * hoursDelta;
    return hoursRemain = (totalEstimatedHours / 100) * level;
  }
  
  const tick = () => {
    const level = battery.chargeLevel;
    
    // If the battery has dropped at least 3% then we can attempt to update the hours remaining
    if (level > 0 && level <= last.level - 3) {
      hoursRemain = calculateHoursRemain(level);
      last = {level: battery.chargeLevel, time: Date.now()};
    }
      
    onUpdate({ chargeLevel: level, hoursRemain })
  }  
  
  const id = setInterval(tick, 60000);  
  
  tick();
  
  return () => {    
    clearInterval(id);
  }
}