import React, { useState } from 'react';
import { supportPanelItems } from '../data/preschoolWellingtonSupport';
import PageContainer from '../components/layout/PageContainer';

export default function PreschoolWellingtonSupportPage() {
  const [campus, setCampus] = useState<'Preschool' | 'Wellington'>('Preschool');
  const items = supportPanelItems.filter(i => i.campus === campus);

  return (
    <PageContainer title="Preschool & Wellington Support Panel">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{campus} Support Panel</h1>
        <div className="mb-4 flex gap-2">
          <button
            className={`px-3 py-1 rounded font-semibold ${campus === 'Preschool' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-300 text-gray-900'}`}
            onClick={() => setCampus('Preschool')}
          >Preschool</button>
          <button
            className={`px-3 py-1 rounded font-semibold ${campus === 'Wellington' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-300 text-gray-900'}`}
            onClick={() => setCampus('Wellington')}
          >Wellington</button>
        </div>
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-100 rounded shadow p-4">
              <div className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-900">{item.title}</div>
              <div className="text-gray-700 dark:text-gray-900 mb-1">{item.description}</div>
              {item.contacts && item.contacts.length > 0 && (
                <div className="mb-1 text-sm">
                  <span className="font-semibold">Contacts: </span>
                  {item.contacts.map((c, i) => (
                    <span key={c.email}>
                      {c.name} ({c.role}) <a href={`mailto:${c.email}`} className="text-blue-600 dark:text-blue-400 underline">Email</a>{i < item.contacts.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              )}
              {item.links && item.links.length > 0 && (
                <div className="mb-1 text-sm">
                  <span className="font-semibold">Links: </span>
                  {item.links.map((l, i) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline mr-2">{l.label}</a>
                  ))}
                </div>
              )}
              {item.checklist && item.checklist.length > 0 && (
                <ul className="text-xs text-gray-500 list-disc ml-5 mt-1">
                  {item.checklist.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
