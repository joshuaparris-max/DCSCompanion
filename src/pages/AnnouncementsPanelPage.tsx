import PageContainer from '../components/Layout/PageContainer';
import KbList from '../components/KB/KbList';

export default function AnnouncementsPanelPage() {
  return (
    <PageContainer title="Announcements & Prayer Requests">
      <div className="max-w-5xl mx-auto p-4">
        <KbList type="announcements" />
      </div>
    </PageContainer>
  );
}
