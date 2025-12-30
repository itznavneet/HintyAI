export function buildPrompt(problem, hintLevel) {
  return `
You are a competitive programming mentor.

Problem:
Title: ${problem.title}

Statement:
${problem.statement}

Give ONLY hint number ${hintLevel}.
Rules:
- Do not reveal solution
- Do not give code
- Be concise
- Focus on intuition and approach
`;
}
