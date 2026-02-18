// TODO: Overload notification object functions to count 

// checking and waiting if Notification class is initialized
// while (!Notification) {}
// while (Notification == null) {};
// while (true) {
// while (Notification === undefined) {

    // if (typeof(Notification) != undefined)
    // if (Notification?)
    // if (typeof Notification !== "undefined")
    // if (Notification !== undefined)
    //     break;
// }

// var NativeNotification;

// for (var flag = false; flag == false;) {
// // for (var flag = true; flag == false;) {

//     try {
//         // const NativeNotification = Notification;
//         NativeNotification = Notification;

//         flag = true;
//     } catch (ReferenceError) {
//         console.log("ReferenceError!");
//     };
// };

// if (!NativeNotification) {
if (!ModNotification_runned) {


    class NotificationBadgeCounter {
        static #window_obj_count = 0;
        static #sw_obj_count = 0;
        static #total_count = 0;

        static incrementCount() {
            this.#window_obj_count++;
            // this.#total_count = this.#sw_obj_count + this.#window_obj_count;
            this.reloadCount();
            console.log("Count incremented: "+ this.#window_obj_count);
        }

        static decrementCount() {
            this.#window_obj_count--;
            // this.#total_count = this.#sw_obj_count + this.#window_obj_count;
            this.reloadCount();
            console.log("Count decremented: "+ this.#window_obj_count);
        }

        static setSWObjCount(count = 0) {
            this.#sw_obj_count = count;
            // this.#total_count = this.#sw_obj_count + this.#window_obj_count;
            this.reloadCount();
            console.log("SW notification count setted: "+ this.#sw_obj_count);
        }

        static reloadCount() {
            this.#total_count = this.#sw_obj_count + this.#window_obj_count;
            navigator.setAppBadge(this.#total_count);
            console.log("Count reloaded: "+ this.#total_count);
        }
    }

    async function createSWNotification(title, options = null) {
        // const options = { tag: "user_alerts" };


        // let registrations = await navigator.serviceWorker.getRegistrations();
        let registration = await navigator.serviceWorker.ready;

        if (!registration) {
            // throw new Error("Doesn't have SW registration!");

            // TODO: get extension SW registration
        }

        let tag_notification;
        let options_final;

        if (options) {
            if (options.tag)
                tag_notification = options.tag;
            else {
                tag_notification = self.crypto.randomUUID();
                options.tag = tag_notification;
            }

            options_final = options;
        }    
        else {
            tag_notification = self.crypto.randomUUID();
            // tag_notification = "user_alerts"
            options_final = {
                tag: tag_notification
            };
        }

        registration.showNotification(title,options_final);

        let notifications;
        let o2 = {tag: tag_notification};
        // notifications = await registration.getNotifications({tag: tag_notification});
        notifications = await registration.getNotifications(o2);

        // return count;
        return notifications[0];
    };

    var class_NotificationBadgeCounter = NotificationBadgeCounter;

    // const NativeNotification = Notification;
    var NativeNotification = Notification;


    // class ModNotification extends NativeNotification {
    class ModNotification {
    // export class ModNotification extends NativeNotification {
        // static #count = 0;
        #obj_native_not = null;

        constructor(title, options = null) {
            console.log("constructed")
            // onTimestampClick()
            //new OriginalNotification(title,options)

            // if (options)
            //     this.#init(title,options).then(() => {});
            // else
            //     this.#init(title).then(() => {});

            if (options){
                // super(title,options);

                // let registrations = await navigator.serviceWorker.getRegistrations();

                createSWNotification(title,options).then((notification) => {
                    this.#obj_native_not = notification;
                    this.#obj_native_not.addEventListener("close", (event) => {});
                    // NotificationBadgeCounter.incrementCount();
                });


            }
            else {
                // super(title);
                createSWNotification(title).then((notification) => {
                    this.#obj_native_not = notification;
                    this.#obj_native_not.addEventListener("close", (event) => {});
                    // NotificationBadgeCounter.incrementCount();
                });
            };


            // Wait for notification construction
            // while (!this.#obj_native_not) {
            //     console.log("Verifying SW notification creation...");
            // };

            // super.addEventListener("close", this.onclose);
            // super.addEventListener("close", this.extonclose);
            // this.addEventListener("close", this.extonclose);
            // this.addEventListener("close", () => {});
            // this.addEventListener("close", (event) => {});
            // super.addEventListener("close", this.#onclose);
            // super.addEventListener("click", this.onclick);

            // Notification.#incrementCount();
            // NotificationBadgeCounter.incrementCount();
        }

        async #init(title,options = null) {


            if (options){
                // super(title,options);

                // let registrations = await navigator.serviceWorker.getRegistrations();

                // createSWNotification(title,options).then((notification) => {this.#obj_native_not = notification;});
                this.#obj_native_not = await createSWNotification(title,options);
            }
            else
                // super(title);
                // createSWNotification(title).then((notification) => {this.#obj_native_not = notification;});
                this.#obj_native_not = await createSWNotification(title);



            // super.addEventListener("close", this.onclose);
            // super.addEventListener("close", this.extonclose);
            // this.addEventListener("close", this.extonclose);
            // this.addEventListener("close", () => {});
            // this.addEventListener("close", (event) => {});
            // super.addEventListener("close", this.#onclose);
            // super.addEventListener("click", this.onclick);
            this.#obj_native_not.addEventListener("close", (event) => {});

            // Notification.#incrementCount();
            NotificationBadgeCounter.incrementCount();
        }

        // #orig_listener = () => {};
        #orig_listener = (event) => {};

        addEventListener(event,listener, options = null) {


            if (event === "close") {

                this.#orig_listener = listener;

                // this.extonclose = this.extonclose.bind(this);
                // this.#orig_listener = this.#orig_listener.bind(this);

                super.removeEventListener(event,this.extonclose);

                if (options == null) {
                    super.addEventListener(event,this.extonclose);
                }
                // else if (typeof options === "boolean") {

                // }
                else {
                    super.addEventListener(event,this.extonclose,options);
                }
            }
            else {

                if (options == null) 
                    super.addEventListener(event,listener);
                else 
                    super.addEventListener(event,listener,options);
            }  
            
        }

        removeEventListener(event,listener, options = null) {


            if (event === "close") {

                // this.#orig_listener = () => {};
                this.#orig_listener = (event) => {};
            }
            else {

                if (options == null) 
                    super.removeEventListener(event,listener);
                else 
                    super.removeEventListener(event,listener,options);
            }  
            
        }

        // static #incrementCount() {
        //     this.#count++;
        //     console.log("Count incremented: "+ this.#count);
        // }

        // static #decrementCount() {
        //     this.#count--;
        //     console.log("Count decremented: "+ this.#count);
        // }

        // onclose = (event) => { Notification.#decrementCount(); };
        // onclose(event) { NotificationBadgeCounter.decrementCount(); };
        // onclose() { NotificationBadgeCounter.decrementCount(); };

        // extonclose() { 
        extonclose(event) { 

            NotificationBadgeCounter.decrementCount(); 

            // this.#orig_listener();
            this.#orig_listener(event);
        };
        
        // onclick() { NotificationBadgeCounter.decrementCount(); };
    };

    Notification = ModNotification;

    window.Notification = ModNotification;
    
    // window.Notification = ModNotification.bind(window);

    var ModNotification_runned = true
}

console.log("Injected script running!");


// function countSWNotifications() {
async function countSWNotifications() {
    // const options = { tag: "user_alerts" };

    // var count = 0;
    let count = 0;

    // navigator.serviceWorker.ready.then((registration) => {

        // count += registration.getNotifications().length;

        // registration.getNotifications(options).then((notifications) => {
        // registration.getNotifications().then((notifications) => {
            // do something with your notifications
            // console.log("Created notification from SW");
        //     count++;
        // });
    // });

    let registrations = await navigator.serviceWorker.getRegistrations();
    let reg_id;
    let notifications;
    
    for (reg_id in registrations) {

        // count += await registrations[reg_id].getNotifications().length;
        notifications = await registrations[reg_id].getNotifications();
        count += notifications.length;
        
    };

    return count;
    // NotificationBadgeCounter.setSWObjCount(count);
};

setInterval(
    async (NotificationBadgeCounter) => { 
        count = await countSWNotifications();
        NotificationBadgeCounter.setSWObjCount( count );
    },
    2000, class_NotificationBadgeCounter);

// TODO: Overload notification object destroy function to update counter

// function renderReadingTime(article) {
//   // If we weren't provided an article, we don't need to render anything.
//   if (!article) {
//     return;
//   }

//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

// renderReadingTime(document.querySelector("article"));