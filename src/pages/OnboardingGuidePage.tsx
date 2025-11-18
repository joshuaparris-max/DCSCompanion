import PageContainer from '../components/Layout/PageContainer';
import { onboardingSteps } from '../data/onboardingGuide';

const OnboardingGuidePage: React.FC = () => {
  return (
    <PageContainer title="Onboarding & Induction Guide">
      <div className="max-w-3xl mx-auto p-4">
        <div className="grid gap-4">
          {onboardingSteps.map(step => (
            <div key={step.id} className="bg-white dark:bg-gray-100 rounded shadow p-4">
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-900">{step.title}</div>
              <div className="text-gray-700 dark:text-gray-700 mb-1">{step.description}</div>
              {step.link && (
                <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-700 underline text-sm">View Policy</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default OnboardingGuidePage;
