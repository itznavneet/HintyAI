/* global chrome */
import { useEffect, useState } from "react";

export default function Popup() {
    const [problem, setProblem] = useState(null);
    const [hints, setHints] = useState([]);
    const [hintLevel, setHintLevel] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tabKey, setTabKey] = useState(null);
    const [blocked, setBlocked] = useState(false);
    const [blockReason, setBlockReason] = useState("");
    const [limitReached, setLimitReached] = useState(false);


    const MAX_HINTS = 4;

    // 🔹 Fetch hint from backend
    const fetchHintFromAI = async (level, prob) => {
        if (level > MAX_HINTS) {
            return null; // No AI call beyond limit
        }

        const hintGuidance = {
            1: "Explain how to think about the problem using constraints. Do not mention any trick yet.",
            2: "Reveal the main observation or trick that simplifies the problem.",
            3: "Guide toward the algorithmic approach without giving steps.",
            4: "Give a near-solution hint focusing on how to implement efficiently."
        };

        const prompt = `
You are a strong Codeforces contestant (1600–1800).

Problem title:
${prob.title}

Problem statement:
${prob.statement}

Hint level: ${level}

Guidance for this hint:
${hintGuidance[level]}

Strict rules:
- Max 2 short sentences
- No formulas

- No LaTeX
- No code
- No explanation
- Do NOT repeat earlier hints
- Be specific, not generic
- Focus on what to think about next

Output only the hint text.
`;

        const res = await fetch("http://localhost:3001/hint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        return data.hint;
    };

    // 🔹 Load session data (if exists)
    useEffect(() => {
        (async () => {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            const key = `${tab.id}_${tab.url}`;
            setTabKey(key);

            chrome.storage.session.get(key, (res) => {
                if (res[key]) {
                    setProblem(res[key].problem);
                    setHints(res[key].hints);
                    setHintLevel(res[key].currentLevel);
                }
            });
        })();
    }, []);

    // 🔹 Save session data
    useEffect(() => {
        if (!tabKey || !problem) return;

        chrome.storage.session.set({
            [tabKey]: {
                problem,
                hints,
                currentLevel: hintLevel
            }
        });
    }, [problem, hints, hintLevel, tabKey]);

    // 🔹 Start hint flow
    const getHint = async () => {
        setLoading(true);

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        //calling contentScript.js wo hi tab se linked hai...
        chrome.tabs.sendMessage(
            tab.id,
            { type: "GET_PROBLEM" },
            async (response) => {
                if (response?.blocked) {
                    setLoading(false);
                    setProblem(null);
                    setBlocked(true);
                    setBlockReason("Hints are disabled during contests and virtual contests.");
                    return;
                }

                setBlocked(false);
                setBlockReason("");

                if (!response?.title) return;

                //saving problem with contentScript response- prob, title, blocked:
                setProblem(response);
                setHints([]);
                setHintLevel(1);

                setLimitReached(false);
                try {
                    const hint = await fetchHintFromAI(1, response);
                    //setting hints in array 
                    setHints([hint]);
                } catch {
                    setHints(["Error generating hint."]);
                }

                setLoading(false);
            }
        );
    };

    // 🔹 Next hint
    const nextHint = async () => {
        if (!problem) return;

        if (hintLevel >= MAX_HINTS) {
            setLimitReached(true);
            return;
        }

        const nextLevel = hintLevel + 1;
        setHintLevel(nextLevel);
        setLoading(true);

        try {
            const hint = await fetchHintFromAI(nextLevel, problem);
            if (hint) {
                setHints((prev) => [...prev, hint]);
            }
        } catch {
            setHints((prev) => [...prev, "Error generating hint."]);
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>HintyAI</h2>
            {blocked && (
                <div className="block-banner">
                    {blockReason}
                </div>
            )}
            {limitReached && (
                <div className="limit-banner">
                    You’ve reached the maximum number of hints for this problem.
                    Try implementing the solution now.
                </div>
            )}



            {!problem && (
                <button onClick={getHint} disabled={loading || blocked}>
                    {loading ? "Please wait..." : "Get Hint"}
                </button>
            )}

            {problem && (
                <>
                    <div className="hint-box">
                        <b>{problem.title}</b>
                        <br /><br />

                        {hints.map((h, idx) => (
                            <div key={idx}>
                                <b>Hint {idx + 1}:</b>
                                <br />
                                {h}
                                <br /><br />
                            </div>
                        ))}

                        {loading && "Generating hint..."}
                    </div>

                    <button
                        onClick={nextHint}
                        disabled={loading || limitReached}
                    >
                        {limitReached ? "Hint limit reached" : loading ? "Please wait..." : "Next Hint"}
                    </button>

                </>
            )}

            <p className="warning">
                Practice only. Not allowed during contests.
            </p>
        </div>
    );
}
