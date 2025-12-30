# HintyAI – Practice-Only Learning Assistant

HintyAI is a Chrome extension that provides **progressive, intuition-based AI hints**
for **Codeforces practice problems only**.

## 🚫 Ethics & Integrity
- ❌ Disabled during live contests
- ❌ Disabled during virtual contests
- ❌ No solutions or code generation
- ✅ Practice-only learning tool

## 🧠 How it works
- Popup UI built with React
- Content script enforces contest blocking
- Backend securely generates hints using OpenAI
- Strict hint limits to encourage independent thinking

## 🛠 Tech Stack
- React + Vite
- Chrome Extensions (Manifest V3)
- Node.js + Express
- OpenAI API

## ⚠️ Setup
```bash
npm install
# add OPENAI_API_KEY in .env
npm run dev
