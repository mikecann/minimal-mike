import { today } from "user-activity";
import { me } from "appbit";
import { createTickWhenDisplayOnService } from "../utils/displayService"

const hasPermissions = () => me.permissions.granted("access_activity");

export const createStairsService = ({ onUpdate }) => {
  
  if (!hasPermissions()) {
    console.error(`cannot get stairs, this device doesnt support it`);
    onUpdate({ stairs: 0 })
    return () => {}
  }
  
  // Only do the work when the screen is on
  const stopDisplayService = createTickWhenDisplayOnService({    
    onTick: () => {
      onUpdate({ stairs: today.adjusted.elevationGain ?? 0 });
    },
    intervalMs: 3000
  })
  
  return () => {
    stopDisplayService();
  }
  
}