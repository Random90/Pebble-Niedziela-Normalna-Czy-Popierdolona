import Poco from "commodetto/Poco";
import DateUtils from "dateUtils";


const render = new Poco(screen);
const dateUtils = new DateUtils();

// Fonts
const mainFont = new render.Font("Gothic-Bold", 28);
const smallTitleFont = new render.Font("Gothic-Regular", 14);

// Colors
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);



function draw() {
    const now = new Date();
    const nextSunday = dateUtils.getNextSundayDate();
    const prefix = now.getMonth() === nextSunday.getMonth() && now.getDate() === nextSunday.getDate() ? 'Dzisiejsza' : "Następna";
    const mainText = dateUtils.isNextSundayNormal() ? "Normalna" : "PoPiErdOLOnA";
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
