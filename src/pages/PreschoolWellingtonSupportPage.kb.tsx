import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function PreschoolWellingtonSupportPage() {
  return (
    <PageContainer title="Preschool & Wellington Support Panel">
      <div className="max-w-3xl mx-auto p-4">
        <KbListWithFavs type="support" />
      </div>
    </PageContainer>
  );
}
