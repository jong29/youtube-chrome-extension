// need to add a listener to when the video ends
// need to add a listener to when the timer is changed

(() => {
  let youtubeLeftControls, youtubePlayer;

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

  // add black screen to youtube page
  const coverScreen = () => {
    console.log("coverScreen");
    const body = document.getElementsByTagName("body")[0];
    const bodyFirstChild = body.firstChild;
    const blackScreen = document.createElement("div");
    blackScreen.style.position = "fixed";
    blackScreen.style.width = "100%";
    blackScreen.style.height = "100%";
    blackScreen.style.backgroundColor = "black";
    blackScreen.style.zIndex = "9999";
    blackScreen.style.top = "0";
    blackScreen.style.left = "0";
    blackScreen.textContent = "You have reached your watch time limit";
    body.insertBefore(blackScreen, bodyFirstChild);
  }

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    const currentWatchTime = await fetchWatchTime();

    if (currentWatchTime > 0) {
      setTimeout(() => {
        // insert black screen
        coverScreen();
        chrome.storage.local.set({ watchTimeSeconds: 0 });
      }, currentWatchTime * 100);
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
