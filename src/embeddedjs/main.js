import Poco from "commodetto/Poco";
import DateUtils from "dateUtils";


const render = new Poco(screen);
const dateUtils = new DateUtils();

// Fonts
const mainFont = new render.Font("Gothic-Bold", 28);
// const dateFont = new render.Font("Gothic-Bold", 24);

// Colors
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);



function draw(event) {
    const now = event.date;
  const mainText = dateUtils.isNextSundayNormal() ? "Normalna" : "PoPiErdOLOnA";

    render.begin();
    render.fillRectangle(black, 0, 0, render.width, render.height);
  
    let textWidth = render.getTextWidth(mainText, mainFont);
    render.drawText(mainText, mainFont, white, (render.width - textWidth) / 2, (render.height / 2) - mainFont.height + 5);
    
    render.end();
}

watch.addEventListener("minutechange", (e) => {
    draw(e);
});
    // Format time as HH:MM
//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");
//     const timeStr = `${hours}:${minutes}`;

    // Center the time vertically (shifted up slightly to make room for date)
//     let width = render.getTextWidth(timeStr, timeFont);
//     render.drawText(timeStr, timeFont, white,
//         (render.width - width) / 2,
//         (render.height / 2) - timeFont.height + 5);

    // Format date as "Mon Jan 01"
//     const dayName = DAYS[now.getDay()];
//     const monthName = MONTHS[now.getMonth()];
//     const dateStr = `${dayName} ${monthName} ${String(now.getDate()).padStart(2, "0")}`;

    // Draw date below the time
//     width = render.getTextWidth(dateStr, dateFont);
//     render.drawText(dateStr, dateFont, white,
//         (render.width - width) / 2,
//         (render.height / 2) + 10);

//     render.end();
