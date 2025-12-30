export const hintLevels = [
  {
    level: 1,
    text: "Understand the problem statement carefully and note constraints."
  },
  {
    level: 2,
    text: "Try a brute-force solution and analyze why it may fail."
  },
  {
    level: 3,
    text: "Look for patterns, observations, or mathematical properties."
  },
  {
    level: 4,
    text: "Think about optimal algorithms or data structures."
  },
  {
    level: 5,
    text: "Write pseudocode and consider edge cases."
  }
];

export function getHint(level) {
  return hintLevels.find(h => h.level === level)?.text
    || "No more hints available.";
}
