import Poco from "commodetto/Poco";
import DateUtils from "dateUtils";
import TimelineHelper from "timelineHelper";
import WakeUp from "pebble/wakeup";

const render = new Poco(screen);
const dateUtils = new DateUtils();
const timeline = new TimelineHelper();

// Fonts
const mainFont = new render.Font("Gothic-Bold", 28);
const smallTitleFont = new render.Font("Gothic-Regular", 14);

// Colors
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);

const LS_WAKE_ID = "wakeid"
const WAKE_COOKIE = 2137;

const nextSunday = dateUtils.getNextSundayDate();
const normalna = dateUtils.isNextSundayNormal(); 
const isBackgroundWake = watch.wake && watch.wake.cookie === WAKE_COOKIE;

timeline.createPin(nextSunday, normalna);

function draw() {
    const now = new Date();
    const prefix = now.getMonth() === nextSunday.getMonth() && now.getDate() === nextSunday.getDate() ? 'Dzisiejsza' : "Następna";
    const mainText = normalna ? "Normalna" : "PoPiErdOLOnA";
    const title = `${prefix} niedziela (${nextSunday.getDate().toString().padStart(2, "0")}.${(nextSunday.getMonth() + 1).toString().padStart(2,"0")}) jest:`;

    render.begin();
    render.fillRectangle(black, 0, 0, render.width, render.height);
  
    const mainTextWidth = render.getTextWidth(mainText, mainFont);
    const smallTitleWidth = render.getTextWidth(title, smallTitleFont);
    render.drawText(mainText, mainFont, white, (render.width - mainTextWidth) / 2, (render.height / 2) - mainFont.height + 5);
    render.drawText(title, smallTitleFont, white, (render.width - smallTitleWidth) / 2, (render.height / 2) - smallTitleFont.height - mainFont.height - 10);
    
    render.end();
};

draw();

const wakeId = localStorage.getItem(LS_WAKE_ID);
if (wakeId) {
    const wakeup = WakeUp.query(wakeId);
    if (!wakeup) {
        console.log("clearing old wakeup id");
        localStorage.removeItem(LS_WAKE_ID);
        scheduleWakeUp();
    } else if (!wakeup.scheduled || wakeup.time <= Date.now()) {
        console.log("Wakeup expired.");
        WakeUp.cancel(wakeId);
        localStorage.removeItem(LS_WAKE_ID);
        scheduleWakeUp();
    } else {
      console.log("Wakeup already scheduled: ", wakeup.time);
    }
} else {
  console.log("No wakeup scheduled.");
  scheduleWakeUp();
}

if (isBackgroundWake) {
  console.log("Automated weekly wakeup triggered.");
  setTimeout(() => { 
      watch.exit(); 
  }, 3000);
}


function scheduleWakeUp() {
  const wakeupDate = new Date(nextSunday);
  wakeupDate.setDate(wakeupDate.getDate() + 2);
  const id = WakeUp.schedule(wakeupDate.getTime(), WAKE_COOKIE, false);
  console.log(`Scheduled WakeUp id ${id}`);
  localStorage.setItem(LS_WAKE_ID, id.toString());
}



// console.log('last sunday of normal month - ', dateUtils.isNextSundayNormal());
// console.log('25.01 exact (true)- ', dateUtils.isNextSundayNormal(new Date('2026-01-25')));
// console.log('23.03 before easter (true) - ', dateUtils.isNextSundayNormal(new Date('2026-03-23')));
// console.log('05.04 easter (false) - ', dateUtils.isNextSundayNormal(new Date('2026-05-04')));
// console.log('25.11 (false) - ', dateUtils.isNextSundayNormal(new Date('2026-11-25')));
// console.log('06.12 (true) - ', dateUtils.isNextSundayNormal(new Date('2026-12-06')));
// console.log('13.12 (true) - ', dateUtils.isNextSundayNormal(new Date('2026-12-13')));
// console.log('20.12 (true) - ', dateUtils.isNextSundayNormal(new Date('2026-12-20'))); 

// console.log('01.04 (false) - ', dateUtils.isNextSundayNormal(new Date('2026-04-01'))); 
// console.log('07.05 (false) - ', dateUtils.isNextSundayNormal(new Date('2026-07-05')));
