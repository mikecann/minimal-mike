import { me as device } from "device";
import document from "document";
import { display } from "display";
import { fromNow } from "../utils/fromNow"

const dateLabel = document.getElementById("dateLabel");
const timeLabel = document.getElementById("timeLabel");
const syncLabel = document.getElementById("syncLabel");

const tapTarget = document.getElementById("tap-target");

let mouseDown = false;
let lastData = { time: "", date: "" };

tapTarget.addEventListener("mousedown", (evt) => {
  mouseDown = true;
  update();
})

tapTarget.addEventListener("mouseup", (evt) => {
  mouseDown = false;
  update();
});

display.addEventListener("change", () => mouseDown = false); 

const update = () => {
  if (mouseDown) {
    timeLabel.text = lastData.time;
    dateLabel.text = `last sync`;
    syncLabel.text = fromNow(device.lastSyncTime);
  }
  else {
    timeLabel.text = lastData.time;
    dateLabel.text = lastData.date;
    syncLabel.text = "";
  }
}

export const renderDateTime = (data) => {
  lastData = data;
  update();
}