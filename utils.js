export async function getActiveTabURL() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export function secondsToHMS(seconds) {
  let hours = Math.floor(seconds / 3600);
  hours = hours < 10 ? "0" + hours : "" + hours;

  let minutes = Math.floor(seconds / 60) % 60;
  minutes = minutes < 10 ? "0" + minutes : "" + minutes;

  let remainingSeconds = seconds % 60;
  remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : "" + remainingSeconds;

  return hours + ":" + minutes + ":" + remainingSeconds;
}
