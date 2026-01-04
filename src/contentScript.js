/* global chrome */
function extractTags() {
  const tagElements = document.querySelectorAll(".tag-box .tag");

  return Array.from(tagElements).map(tag =>
    tag.innerText.trim().toLowerCase()
  );
}

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

  const tags = extractTags();

  return {
    title,
    statement,
    tags
  };
}


//sendMessage ko response bhejega....
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_PROBLEM") {
    if (isContestBlocked()) {
      sendResponse({ blocked: true });
      return;
    }

    const { title, statement, tags } = extractProblem();
    //this is what getting extract from tab
    sendResponse({
      blocked: false,
      title,
      statement,
      tags
    });

  }
});
