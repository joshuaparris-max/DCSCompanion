import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function TaskTrackerPage() {
  return (
    <PageContainer title="ICT/Library Task Tracker">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="tasks" />
      </div>
    </PageContainer>
  );
}
