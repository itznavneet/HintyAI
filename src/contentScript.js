/* global chrome */

function isContestBlocked() {
  const contestState = document.querySelector(".contest-state-regular");

  // Not a contest page → allow
  if (!contestState) return false;

  const stateText = contestState.innerText.toLowerCase();

  // Only PRACTICE is allowed
  if (stateText.includes("practice")) return false;

  // Live + Virtual → block
  return true;
}

function extractProblem() {
  const title =
    document.querySelector(".problem-statement .title")?.innerText || "";

  const statement =
    document.querySelector(".problem-statement")?.innerText || "";

  return { title, statement };
}

//sendMessage ko response bhejega....
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_PROBLEM") {
    if (isContestBlocked()) {
      sendResponse({ blocked: true });
      return;
    }

    const { title, statement } = extractProblem();
    //this is what getting extract from tab
    sendResponse({
      blocked: false,
      title,
      statement
    });
  }
});
