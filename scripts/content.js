console.log("Content script running...");

const registerWNCBExtServiceWorker = async (sw_file_path) => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        // 'sw.js',
        sw_file_path,
        {
          scope: './',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// registerWNCBExtServiceWorker(chrome.runtime.getURL("scripts/service-worker.js"));

// function renderReadingTime(article) {
function renderScript() {
  // If we weren't provided an article, we don't need to render anything.
//   if (!article) {
//     return;
//   }

//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
  
  
  var e = document.createElement("script");


  //   e.innerText = "var ModNotification = window.Notification;"
  let path_inject_script = chrome.runtime.getURL("scripts/inject-script.js");
  e.setAttribute("src",path_inject_script);
  e.setAttribute("type","text/javascript");
  // document.WNCBExtServiceWorker = chrome.runtime.getURL("scripts/service-worker.js");
  // e.innerText = "var WNCBExtServiceWorker = '"+ chrome.runtime.getURL("scripts/service-worker.js") + "';"; 


  e_body = document.querySelector("body");
  e_body.insertAdjacentElement("afterend",e);

  // var e2 = document.createElement("script");
  // e2.setAttribute("type","text/javascript");
  // e2.innerText = "var WNCBExtServiceWorker = '"+ chrome.runtime.getURL("scripts/service-worker.js") + "';"; 

  // var e2 = document.createElement("input");
  // e2.setAttribute("type","hidden");
  // e2.setAttribute("id","WNCBExtServiceWorker");
  // e2.setAttribute("value",chrome.runtime.getURL("scripts/service-worker.js"));

  // e_body.insertAdjacentElement("afterend",e2);

  
  
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
}

// renderReadingTime(document.querySelector("article"));
renderScript();