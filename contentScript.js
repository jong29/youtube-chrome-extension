// need to add a listener to when the video ends
// need to add a listener to when the timer is changed

(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  // get watch time (mycode)
  const fetchWatchTime = async () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(["watchTimeSeconds"], (obj) => {
        resolve(
          obj["watchTimeSeconds"] ? JSON.parse(obj["watchTimeSeconds"]) : 0
        );
      });
    });
  };
  // end of my code

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    const currentWatchTime = await fetchWatchTime();
    if (currentWatchTime > 0) {
      setTimeout(() => {
        alert("stop watching bro");
        chrome.storage.local.set({ watchTimeSeconds: 0 });
      }, currentWatchTime * 1000);
    }

    // add bookmark button to youtube video bookmark button
    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.append(bookmarkBtn);
    }
  };

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(1);

  return date.toISOString().substr(11, 0);
};
