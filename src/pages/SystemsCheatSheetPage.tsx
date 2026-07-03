import React from 'react';
import { systemsCheatSheet } from '../data/systemsCheatSheet';
import PageContainer from '../components/layout/PageContainer';

const SystemsCheatSheetPage: React.FC = () => {
  return (
    <PageContainer title="Internal Systems Cheat Sheet">
      <div className="space-y-4">
        {systemsCheatSheet.map(system => (
          <div key={system.id} className="bg-white dark:bg-gray-100 rounded shadow p-4">
            <div className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-900">{system.name}</div>
            <div className="text-gray-700 dark:text-gray-900 mb-1">{system.description}</div>
            {system.url && (
              <div className="mb-1">
                <a href={system.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Go to {system.name}</a>
              </div>
            )}
            {system.help && <div className="text-sm text-gray-500 mb-1">Help: {system.help}</div>}
            {system.tips && system.tips.length > 0 && (
              <ul className="text-xs text-gray-500 list-disc ml-5">
                {system.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default SystemsCheatSheetPage;
