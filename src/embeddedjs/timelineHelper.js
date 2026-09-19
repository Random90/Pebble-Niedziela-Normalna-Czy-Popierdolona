import Message from "pebble/message";

class TimelineHelper {  
  createPin(sundayDate) {
      const message = new Message({
        keys: ["SundayDate", "Normalna", "PhoneReady"],
        onReadable() {
            const msg = this.read();
            msg.forEach((value, key) => {
                console.log(key + ": " + value);
            });
        },
        onWritable() {
            console.log("Ready to send messages");
            if (this.once) {
              console.log('once!')
			        return;
            }

        		this.once = true;
        		 message.write(new Map([
              ["SundayDate", sundayDate.toISOString()],
              ["Normalna", false]
            ]));
        		console.log("wrote!");
        },
        onSuspend() {
            console.log("Messages suspended");
        }
      });
  }
}

export default TimelineHelper;