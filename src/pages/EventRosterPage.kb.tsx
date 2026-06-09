import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function EventRosterPage() {
  return (
    <PageContainer title="Events & Duty Roster">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="events" />
      </div>
    </PageContainer>
  );
}
