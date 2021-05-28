/*

A bunch of this is inspired by examples found at: https://dev.fitbit.com/build/tutorials/examples/
  
*/

import document from "document";
import { vibration } from "haptics";

import { initHeartRateService } from "./heartRate/service";
import { updateHeartRateData } from "./heartRate/render";

import { initDateTimeService } from "./dateTime/service";
import { renderDateTime } from "./dateTime/render";

import { createBatteryService } from "./battery/service";
import { setBatteryData } from "./battery/render";

import { createStepsService } from "./steps/service";
import { renderSteps } from "./steps/render";

import { createPressureService } from "./pressure/service";
import { renderPressure } from "./pressure/render";

import { createStairsService } from "./stairs/service";
import { renderStairs } from "./stairs/render";

import { initFlashlight } from "./flashlight/flashlight";

const log = (msg, data) => console.log(msg, JSON.stringify(data)); 

const tapTarget = document.getElementById("tap-target");

tapTarget.addEventListener("mousedown", (evt) => {
  vibration.start("bump");
})

tapTarget.addEventListener("mouseup", (evt) => {
  vibration.start("bump");
});

// Flashlight

initFlashlight();

// Heart Rate

initHeartRateService(updateHeartRateData);

// Date Time

initDateTimeService({
  granularity: "minutes",
  dateFormat: "longDate",
  onUpdate: renderDateTime
})

// Battery

createBatteryService(setBatteryData);

// Steps

const stepsLabel = document.getElementById("stepsLabel");

createStepsService({ onUpdate: (data) => renderSteps({ data, label: stepsLabel }) });

// Pressure

//const pressureLabel = document.getElementById("pressureLabel");

//createPressureService({ onUpdate: (data) => renderPressure({ data, label: pressureLabel }) });

// Stairs

const stairsLabel = document.getElementById("stairsLabel");

createStairsService({ onUpdate: (data) => renderStairs({ data, label: stairsLabel }) });
