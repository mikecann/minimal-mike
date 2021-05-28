import { me } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import { createTickWhenDisplayOnService } from "../utils/displayService";

const hasPermissions = () => me.permissions.granted("access_heart_rate") && me.permissions.granted("access_user_profile");

export const initHeartRateService = (onUpdate) => {
  
  // We cant monitor the HR unless we have permission to do so
  if (!hasPermissions()) {
    console.log("Denied Heart Rate or User Profile permissions");
    return () => {};
  }
  
  // Lets Init the sensor
  const sensor = new HeartRateSensor();
  
  // Report it back to the caller of this service
  const getAndReportReading = () => 
    onUpdate({
      bpm: sensor.heartRate || 0,
      zone: user.heartRateZone(sensor.heartRate || 0),
      restingHeartRate: user.restingHeartRate
    }); 
  
  // Only do the work when the screen is on
  const stopDisplayService = createTickWhenDisplayOnService({
    onTick: getAndReportReading,
    
    onStart: () => {
      sensor.start();
      getAndReportReading();
    },
    
    onStop: () => {
      sensor.stop()
    },
    
    intervalMs: 1000
  })
  
  // We return a callback that destroys this service
  return () => {
    stopDisplayService();
  }
}





