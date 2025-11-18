import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button';

export default function QuickLinksCard() {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="font-semibold mb-2">Quick Links</h3>
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => navigate('/ict')}>Open ICT Desk</Button>
        <Button onClick={() => navigate('/library')}>Open Library Assistant</Button>
        <Button onClick={() => navigate('/settings')}>Settings</Button>
      </div>
    </div>
  );
}
