console.log("START");

function wakeUpWatch(retryCount) {
  let maxRetries = 5;
  let currentRetry = retryCount || 0;

  console.log('Sending wake up ping to watch (Attempt ' + (currentRetry + 1) + ')...');

  Pebble.sendAppMessage({ "PhoneReady": 1 }, () => {
    console.log("Phone connection established.");
  }, (err) => {
    console.warn("Wake up ping failed (Watch buffers might still be opening).");
    
    if (currentRetry < maxRetries) {
      console.log("Retrying handshake in 300ms...");
      setTimeout(() => {
        wakeUpWatch(currentRetry + 1);
      }, 300);
    } else {
      console.error("Critical: Could not establish bridge connection after maximum retries.");
    }
  });
}

Pebble.addEventListener('ready', () => {
  // Send an empty wake up message to trigger the watch's onWritable
  wakeUpWatch(0);
});

Pebble.addEventListener('appmessage', (event) => {
  console.log("recevied: ",JSON.stringify(event));
  let dict = event.payload;
  
  if (dict && dict.SundayDate) {
    const sundayDate = new Date(dict.SundayDate)
    sundayDate.setHours(0, 0, 2, 137);
    console.log("adding pin for: ", 'sunday' + sundayDate.getFullYear() + sundayDate.getMonth() + sundayDate.getDate());
    Pebble.insertTimelinePin({
      id: 'sunday' + sundayDate.getFullYear() + sundayDate.getMonth() + sundayDate.getDate(),
      time: sundayDate.toISOString(),
      layout: {
        type: 'genericPin',
        title: dict.Normalna == 1 ? 'Normalna Niedziela' : 'PoPiErdOLOnA Niedziela',
        tinyIcon: dict.Normalna == 1 ? 'system://images/MUSIC_EVENT' : 'system://images/GENERIC_WARNING'
      }
    });
  }
});

