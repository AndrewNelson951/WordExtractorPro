chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "findWord") {
      const word = request.word;
      const regex = new RegExp("\\b" + word + "\\b", "gi");
      const matches = document.body.innerText.match(regex);
      const count = matches ? matches.length : 0;
      sendResponse({ count: count });
    }
  });