import PageContainer from '../components/Layout/PageContainer';
import KbList from '../components/KB/KbList';

const OnboardingGuidePage: React.FC = () => {
  return (
    <PageContainer title="Onboarding & Induction Guide">
      <div className="max-w-5xl mx-auto p-4">
        <KbList type="onboarding" />
      </div>
    </PageContainer>
  );
};

export default OnboardingGuidePage;
