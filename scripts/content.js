console.log("Content script running...");

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


  e_body = document.querySelector("body");
  e_body.insertAdjacentElement("afterend",e);
  
  
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