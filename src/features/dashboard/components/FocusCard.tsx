import React from 'react';
import { today } from '../../../lib/dateUtils';

interface FocusEntry {
  id: string;
  title: string;
  scriptureRef: string;
  scriptureText: string;
  prompt: string;
}

const FOCUS_ENTRIES: FocusEntry[] = [
  {
    id: "work-heartily",
    title: "Work wholeheartedly",
    scriptureRef: "Colossians 3:23",
    scriptureText: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    prompt: "What is one task today I can quietly offer to the Lord, doing it with all my heart?"
  },
  {
    id: "wisdom-gentleness",
    title: "Wisdom and gentleness",
    scriptureRef: "James 3:17",
    scriptureText: "But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit...",
    prompt: "Where might I respond with gentleness and mercy instead of defensiveness today?"
  },
  {
    id: "servant-leadership",
    title: "Servant Leadership",
    scriptureRef: "Mark 10:45",
    scriptureText: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
    prompt: "How can I serve someone quietly today?"
  },
  {
    id: "peace-patience",
    title: "Peace and Patience",
    scriptureRef: "Romans 12:12",
    scriptureText: "Be joyful in hope, patient in affliction, faithful in prayer.",
    prompt: "Where do I need to be patient and prayerful today?"
  },
];

export default function FocusCard() {
  const index = (today().getDate() + today().getMonth()) % FOCUS_ENTRIES.length;
  const entry = FOCUS_ENTRIES[index];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="font-semibold mb-2">Focus & Scripture</h3>
      <div className="font-bold mb-1">{entry.title}</div>
      <div className="italic mb-1">{entry.scriptureRef}: {entry.scriptureText}</div>
      <div className="text-sm text-gray-700">{entry.prompt}</div>
    </div>
  );
}
