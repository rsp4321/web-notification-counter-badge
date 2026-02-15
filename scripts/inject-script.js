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
        static #count = 0;

        static incrementCount() {
            this.#count++;
            console.log("Count incremented: "+ this.#count);
        }

        static decrementCount() {
            this.#count--;
            console.log("Count decremented: "+ this.#count);
        }


    }

    // const NativeNotification = Notification;
    var NativeNotification = Notification;


    class ModNotification extends NativeNotification {
    // export class ModNotification extends NativeNotification {
        // static #count = 0;

        constructor(title, options = { }) {
            console.log("constructed")
            // onTimestampClick()
            //new OriginalNotification(title,options)

            if (options)
                super(title,options);
            else
                super(title);

            // Notification.#incrementCount();
            NotificationBadgeCounter.incrementCount();
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
    };

    Notification = ModNotification;

    window.Notification = ModNotification;
    
    // window.Notification = ModNotification.bind(window);

    var ModNotification_runned = true
}

console.log("Injected script running!");


// var count = 0;

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
};

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