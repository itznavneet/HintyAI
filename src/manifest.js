export default {
  manifest_version: 3,
  name: "HintyAI (Practice Mode)",
  version: "1.0.0",
  description: "Progressive AI hints for Codeforces practice problems",

  action: {
    default_popup: "popup/popup.html"
  },
   icons: {
    "16": "assets/icons/icon16.png",
    "32": "assets/icons/icon32.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  },

  permissions: ["storage", "activeTab"],

  host_permissions: [
    "https://codeforces.com/*"
  ],
  content_scripts: [
    {
      matches: ["https://codeforces.com/*"],
      js: ["contentScript.js"]
    }
]
};
