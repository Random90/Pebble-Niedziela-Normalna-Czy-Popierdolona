import Message from "pebble/message";

class TimelineHelper {  
  createPin(sundayDate, normalna) {
      const message = new Message({
        keys: ["SundayDate", "Normalna", "PhoneReady"],
        onReadable() {
            const msg = this.read();
            msg.forEach((value, key) => {
                console.log(key + ": " + value);
            });
        },
        onWritable() {
            if (this.once) {  
			        return;
            }

        		this.once = true;
        		 message.write(new Map([
              ["SundayDate", sundayDate.toISOString()],
              ["Normalna", normalna]
            ]));
          console.log("Pin queried to phone: ", sundayDate.toISOString());
        },
        onSuspend() {
        }
      });
  }
}

export default TimelineHelper;