import { today } from "user-activity";
import { me } from "appbit";
import { createTickWhenDisplayOnService } from "../utils/displayService"

const hasPermissions = () => me.permissions.granted("access_activity");

export const createStepsService = ({ onUpdate }) => {
  
  if (hasPermissions() == false) {
    console.error(`cannot get steps, permission not granted`)
    return () => {}
  }
  
  // Only do the work when the screen is on
  const stopDisplayService = createTickWhenDisplayOnService({
    
    onTick: () => onUpdate({ steps: today.adjusted.steps }),
    
    intervalMs: 1000
    
  })
  
  return () => {
    stopDisplayService();
  };  
}