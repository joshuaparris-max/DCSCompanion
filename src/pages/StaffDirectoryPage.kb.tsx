import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function StaffDirectoryPage() {
  return (
    <PageContainer title="Staff Directory & Quick Contacts">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="staff-directory" />
      </div>
    </PageContainer>
  );
}
