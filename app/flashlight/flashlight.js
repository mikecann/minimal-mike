import document from "document";
import { display } from "display";

export const initFlashlight = () => {
  
  const tapTarget = document.getElementById("tap-target");
  
  let lastClickTime = 0;
  let alwaysOnInterval = 0;
  
  display.addEventListener("change", () => {
    lastClickTime = 0;
    turnFlashlightOff();
  }); 
  
  const keepFlashlightOn = () => {
    display.poke();
    alwaysOnInterval = setInterval(() => display.poke(), 1000);
  }
  
  const turnFlashlightOn = () => {
    tapTarget.style.opacity = 100;
    keepFlashlightOn();
    display.brightnessOverride = "max";
  }
  
  const turnFlashlightOff = () => {
    tapTarget.style.opacity = 0;
    display.brightnessOverride = undefined;
    clearInterval(alwaysOnInterval);
  }
  
  tapTarget.addEventListener("click", (evt) => {
    const delta = Date.now() - lastClickTime; 
    if (delta < 500) {
      if(tapTarget.style.opacity == 0) {
        turnFlashlightOn();
      }
      else {
        turnFlashlightOff();
      }
    }
    lastClickTime = Date.now();
  })
}