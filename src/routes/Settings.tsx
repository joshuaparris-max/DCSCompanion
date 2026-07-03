import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold mb-2">Settings</h1>
      <Card title="Theme">
        <Button>Toggle Light/Dark</Button>
        {/* TODO: Wire up theme toggle in future */}
      </Card>
      <Card title="Profile">
        <p>IT & Library Assistant at DCS</p>
        {/* TODO: Add real profile integration later */}
      </Card>
    </div>
  );
}
