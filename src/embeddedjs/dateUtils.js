class DateUtils {
  isNextSundayNormal() {
    return false;
  }
  
  getNextSundayDate() {
    const now = new Date();
    now.setDate(now.getDate() + 7 - now.getDay());
    return now;
  }
}

export default DateUtils;