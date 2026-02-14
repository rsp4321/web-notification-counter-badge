// TODO: inject script with scripting API

// function getTabId() { ... }

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

// function injectScript() {
function injectScript(tab_id) {
  chrome.scripting.executeScript({
        // target : {tabId : getTabId()},
        // target : {tabId : tab.id},
        target : {tabId : tab_id},
        // target : {tabId : getCurrentTab().id},
        files : [ "scripts/inject-script.js" ],
      })
      .then(() => console.log("script injected"));
}

chrome.tabs.onCreated.addListener(
  // (tab) => {injectScript()},
  (tab_id) => {injectScript(tab_id)},
);

chrome.tabs.onUpdated.addListener(
  // (tab) => {injectScript()},
  (tab_id) => {injectScript(tab_id)},
);


// const ALARM_NAME = 'check-alarm';

// // Check if alarm exists to avoid resetting the timer.
// // The alarm might be removed when the browser session restarts.
// async function createAlarm() {
//   const alarm = await chrome.alarms.get(ALARM_NAME);
//   if (typeof alarm === 'undefined') {
//     chrome.alarms.create(ALARM_NAME, {
//       delayInMinutes: 1,
//       periodInMinutes: 1440
//     });
//     // updateTip();
//     injectScript();
//   }
// }

// createAlarm();

// // Update tip once a day
// // chrome.alarms.onAlarm.addListener(updateTip);
// chrome.alarms.onAlarm.addListener(injectScript);