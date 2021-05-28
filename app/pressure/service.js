import { Barometer } from "barometer";
import { createTickWhenDisplayOnService } from "../utils/displayService"

export const createPressureService = ({ onUpdate }) => {
  
  if (!Barometer) {
    console.error(`cannot get pressure, this device doesnt support it`)
    return () => {}
  }
  
   const barometer = new Barometer({ frequency: 1 });  

  
  // Only do the work when the screen is on
  const stopDisplayService = createTickWhenDisplayOnService({
    
    onTick: () => onUpdate({ pressure: barometer.pressure }),
    
    onStart: () => barometer.start(),
    
    onStop: () => barometer.stop(),
    
    intervalMs: 1000
    
  })
  
  return () => {
    stopDisplayService();
  }
  
}