import { display } from "display";

export const createDisplayService = ({onTurnOn, onTurnOff}) => { 
  // Call the various callbacks depending on the state of the display
  const onDisplayChange = () => {
     if (display.on) onTurnOn();
     else onTurnOff();    
  }
  
  // Start listening for display changes
  display.addEventListener("change", onDisplayChange);  
  onDisplayChange();
  
  // We return a callback that destroys this service
  return () => {
    display.removeEventListener("change", onDisplayChange)
    onTurnOff();
  }
}

const noOp = () => {}

export const createTickWhenDisplayOnService = ({onTick = noOp, onStart = noOp, onStop = noOp, intervalMs = 1000}) => {
  
  // We need this for stopping and starting the check interval below
  let intervalId = null;
  
  // Start ticking
  const start = () => {    
    // If we are already 
    if (intervalId != null) return;
  
    // Let listeners know
    onStart();
    
    // StartTicking
    intervalId = setInterval(onTick, intervalMs);
  } 
  
  // Stop the sensor and our report (for better battery)
  const stop = () => {    
    if (intervalId == null) return;
    
    // Let listeners knonw
    onStop();
    
    // And stop ticking
    clearInterval(intervalId);
    intervalId = null;
  }
  
  return createDisplayService({
    onTurnOn: start,
    onTurnOff: stop,    
  })  
}