class DateUtils {
  isNextSundayNormal() {
    return false;
  }
  
  getNextSundayDate() {
    const now = new Date();
    if (now.getDay() === 0) return now;
    now.setDate(now.getDate() + 7 - now.getDay());
    return now;
  }
}

export default DateUtils;