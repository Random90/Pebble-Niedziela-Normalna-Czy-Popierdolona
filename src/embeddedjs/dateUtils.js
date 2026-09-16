class DateUtils {
  normalMonths = [0, 3, 5, 7];
  rigidHolidays = [
    '01.01', // Nowy Rok
    '01.06', // Trzech Króli
    '05.01', // Święto Pracy
    '05.03', // Święto Konstytucji 3 Maja
    '08.15', // Wniebowzięcie NMP / Święto Wojska Polskiego
    '11.01', // Wszystkich Świętych
    '11.11', // Święto Niepodległości
    '12.24', // Wigilia
    '12.25', // Boże Narodzenie (Dzień 1)
    '12.26', // Boże Narodzenie (Dzień 2)
  ];

  isNextSundayNormal(customDate = null) {
    const nextSunday = this.getNextSundayDate(customDate);
    if (this.isHoliday(nextSunday)) return false;
    if (this.isLastSundayOfNormalMonth(nextSunday)) return true;
    if (this.isSundayBeforeEaster(nextSunday)) return true;
    if (this.isSundayBeforeChristmas(nextSunday)) return true;
    return false;
  }

  getNextSundayDate(customDate = null) {
    let now;
    if (customDate !== null) {
      now = new Date(customDate);
    } else {
      now = new Date();
    }
    now.setHours(0, 0, 0, 0);
    if (now.getDay() === 0) return now;
    now.setDate(now.getDate() + 7 - now.getDay());
    return now;
  }

  isLastSundayOfNormalMonth(sundayDate) {
    sundayDate = new Date(sundayDate);
    sundayDate.setHours(0, 0, 0, 0);
    const currentMonth = sundayDate.getMonth();
    if (!this.normalMonths.includes(currentMonth)) return false;
    sundayDate.setDate(sundayDate.getDate() + 7);
    if (sundayDate.getMonth() !== currentMonth) return true;
    return false;
  }

  getEaster(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const L = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * L) / 451);
    const easterMonth = Math.floor((h + L - 7 * m + 114) / 31) - 1; // convert 1-indexed to 0-indexed
    const easterDay = ((h + L - 7 * m + 114) % 31) + 1;

    return new Date(Date.UTC(year, easterMonth, easterDay));
  }

  isHoliday(date) {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currentFormatted = `${month}.${day}`;
    if (this.rigidHolidays.includes(currentFormatted)) return true;
    const easter = this.getEaster(date);
    const corpusChristi = new Date(easter.getTime());
    corpusChristi.setDate(easter.getDate() + 60);
    const ccFormatted = `${String(corpusChristi.getMonth() + 1).padStart(2, '0')}.${String(corpusChristi.getDate()).padStart(2, '0')}`;
    if (currentFormatted === ccFormatted) return true;
    return false;
  }

  isSundayBeforeEaster(sundayDate) {
    sundayDate = new Date(sundayDate);
    sundayDate.setHours(0, 0, 0, 0);
    if (![2, 3].includes(sundayDate.getMonth())) return false;
    const easter = this.getEaster(sundayDate);
    const sundayBeforeEaster = new Date(easter.getTime());
    sundayBeforeEaster.setDate(easter.getDate() - 7);
    sundayBeforeEaster.setHours(0, 0, 0, 0);
    return sundayDate.getTime() === sundayBeforeEaster.getTime();
  }

  isSundayBeforeChristmas(sundayDate) {
    sundayDate = new Date(sundayDate);
    sundayDate.setHours(0, 0, 0, 0);
    if (sundayDate.getMonth() !== 11) return false;
    const christmas = new Date(sundayDate.getFullYear(), 11, 24);
    const lastSunday = new Date(christmas);
    lastSunday.setDate(christmas.getDate() - christmas.getDay());

    for (let i = 0; i < 3; i++) {
      const candidate = new Date(christmas);
      candidate.setDate(lastSunday.getDate() - i * 7);
      candidate.setHours(0, 0, 0, 0);
      if (candidate.getTime() === sundayDate.getTime()) {
        return true;
      }
    }
    return false;
  }
}

export default DateUtils;