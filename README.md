# DCS Companion

A personal helper app for Dubbo Christian School IT/Library support staff.

## Features
- Home dashboard with editable Focus & Scripture, quick links (with pinning), DCS map, ICT snapshot, and daily priorities panel.
- DCS Knowledge Base with search, category filter, pin/favorite, expandable details, and import/export of favorites.
- Ask DCS (LLM) chat with Groq LLM integration, markdown answers, recent questions, and KB context.
- User settings (theme toggle, dark/light mode).

## Setup
1. Clone the repo and run `npm install`.
2. Create a `.env` file in the project root with your Groq API key:
   ```
   VITE_GROQ_API_KEY=your-groq-api-key-here
   ```
3. Run `npm run dev` to start the app.

## Customization
- Add/edit KB topics in `src/data/dcsKnowledgeBase.ts`.
- Add/edit workflows in `src/data/dcsWorkflows.ts`.
- Change the LLM model in `src/services/llmClient.ts` if needed.

## Security
- This app is for personal/internal use only. Do not expose your API key publicly.

## Extending
- The codebase is modular and ready for future AI agent or workflow extensions.

---

*Built with Vite, React, TypeScript, Tailwind, and Groq LLM.*
