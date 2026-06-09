import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function ResourceBookingPage() {
  return (
    <PageContainer title="Resource Booking & Inventory">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="resources" />
      </div>
    </PageContainer>
  );
}

