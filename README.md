# HintyAI

HintyAI is a Chrome extension for Codeforces practice that gives short, progressive AI hints instead of full solutions. It is designed to support learning while still making you do the problem-solving work yourself.

## What It Does

- Reads the current Codeforces problem from the active tab
- Detects whether the page is in practice mode or part of a contest/virtual contest
- Generates up to 4 increasingly helpful hints
- Stores hint progress per tab/session using Chrome session storage
- Calls a small local backend that forwards prompt requests to OpenAI

## Practice-Only Guardrails

- Disabled during live contests
- Disabled during virtual contests
- Intended for practice mode only
- Hints are short and non-solution-oriented
- No code output is requested from the model

## How It Works

### Extension flow

1. Open a Codeforces problem page.
2. Click the extension popup and choose `Get Hint`.
3. The content script extracts:
   - problem title
   - full statement text
   - visible tags
4. The popup sends that data to a local backend at `http://localhost:3001/hint`.
5. The backend requests a hint from OpenAI and returns it to the popup.
6. You can ask for the next hint until the 4-hint limit is reached.

### Main parts of the project

- `src/popup/Popup.jsx`
  Popup UI and hint flow logic
- `src/contentScript.js`
  Extracts Codeforces problem data and blocks usage outside practice mode
- `src/manifest.js`
  Chrome extension Manifest V3 config
- `hintyai-backend/index.js`
  Express backend that calls the OpenAI API

## Tech Stack

- React 19
- Vite
- `@crxjs/vite-plugin`
- Chrome Extension Manifest V3
- Node.js + Express
- OpenAI API

## Project Structure

```text
CF-HInt/
|- src/
|  |- manifest.js
|  |- contentScript.js
|  |- popup/
|     |- Popup.jsx
|     |- popup.html
|     |- popup.css
|     |- main.jsx
|- hintyai-backend/
|  |- index.js
|  |- package.json
|- dist/
|- package.json
```

## Setup

### 1. Install extension dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd hintyai-backend
npm install
```

### 3. Create backend environment file

Create `hintyai-backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the backend

From `hintyai-backend/`:

```bash
node index.js
```

The backend listens on `http://localhost:3001`.

### 5. Build the extension

From the project root:

```bash
npm run build
```

This generates the unpacked extension in `dist/`.

### 6. Load it in Chrome

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select the project's `dist` folder

## Usage

1. Open a Codeforces problem in practice mode.
2. Click the HintyAI extension icon.
3. Press `Get Hint`.
4. Use `Next Hint` if you want a stronger nudge.
5. Stop before the limit if you want to keep the challenge intact.

## Current Behavior

- Host access is limited to `https://codeforces.com/*`
- State is saved with `chrome.storage.session`
- Hint history is tied to the active tab URL and tab id
- Maximum hint count is `4`
- Contest pages are blocked in the content script before hint generation starts

## Scripts

From the root:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Note: for actual Chrome loading, `npm run build` and loading `dist/` is the reliable path.

## Limitations

- The backend URL is currently hardcoded to `http://localhost:3001/hint`
- Contest detection depends on current Codeforces page markup
- There are no automated tests yet
- The backend currently uses `gpt-4o-mini`

## Future Improvements

- Add a proper backend start script
- Add retry/error handling for network failures
- Improve contest/practice detection robustness
- Add configurable hint tone and depth
- Add tests for content extraction and popup flow

## License

This project includes a `LICENSE` file in the repository root.
