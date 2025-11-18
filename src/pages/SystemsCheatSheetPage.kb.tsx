import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function SystemsCheatSheetPage() {
  return (
    <PageContainer title="Internal Systems Cheat Sheet">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="systems" />
      </div>
    </PageContainer>
  );
}
