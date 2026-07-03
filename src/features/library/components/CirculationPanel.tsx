import { useState } from 'react';
import type { Resource, Borrower, Loan } from '../../../lib/types';
import { checkoutResource, returnResource, loadBorrowers, saveBorrowers } from '../../../lib/libraryStorage';
import Button from '../../../components/UI/Button';

interface Props {
  selectedResource?: Resource;
  borrowers: Borrower[];
  loans: Loan[];
  onRefresh: () => void;
}

export default function CirculationPanel({ selectedResource, borrowers, loans, onRefresh }: Props) {
  const [borrowerCode, setBorrowerCode] = useState('');
  const [loanPeriod, setLoanPeriod] = useState(14);
  const [message, setMessage] = useState('');
  const [newBorrower, setNewBorrower] = useState({ name: '', code: '', role: 'Student', yearLevel: '' });

  function handleCheckout() {
    if (!selectedResource) return;
    const result = checkoutResource({ barcode: selectedResource.barcode, borrowerCode, loanPeriodDays: loanPeriod });
    if (result.ok) {
      setMessage('Checked out successfully!');
      setBorrowerCode('');
      onRefresh();
    } else {
      setMessage(result.error);
    }
    setTimeout(() => setMessage(''), 2000);
  }

  function handleReturn() {
    if (!selectedResource) return;
    const result = returnResource(selectedResource.barcode);
    if (result.ok) {
      setMessage('Returned successfully!');
      onRefresh();
    } else {
      setMessage(result.error);
    }
    setTimeout(() => setMessage(''), 2000);
  }

  function handleAddBorrower(e: React.FormEvent) {
    e.preventDefault();
    if (!newBorrower.name.trim() || !newBorrower.code.trim()) return;
    const borrowersList = loadBorrowers();
    borrowersList.push({
      id: crypto.randomUUID(),
      name: newBorrower.name,
      code: newBorrower.code,
      role: newBorrower.role as Borrower["role"],
      yearLevel: newBorrower.yearLevel,
    });
    saveBorrowers(borrowersList);
    setNewBorrower({ name: '', code: '', role: 'Student', yearLevel: '' });
    onRefresh();
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Circulation</h2>
      {selectedResource ? (
        <div className="mb-2">
          <div><strong>Selected:</strong> {selectedResource.title} ({selectedResource.barcode})</div>
          <div><strong>Status:</strong> {selectedResource.status}</div>
          {selectedResource.status === 'Available' ? (
            <div className="mt-2">
              <input
                className="input mb-2"
                placeholder="Borrower code"
                value={borrowerCode}
                onChange={e => setBorrowerCode(e.target.value)}
              />
              <input
                className="input mb-2"
                type="number"
                min={1}
                max={60}
                value={loanPeriod}
                onChange={e => setLoanPeriod(Number(e.target.value))}
                placeholder="Loan period (days)"
              />
              <Button onClick={handleCheckout}>Checkout</Button>
            </div>
          ) : (
            <Button onClick={handleReturn}>Return</Button>
          )}
        </div>
      ) : (
        <div>Select a resource to manage circulation.</div>
      )}
      {message && <div className="text-blue-600 text-sm">{message}</div>}
      <form className="space-y-2" onSubmit={handleAddBorrower}>
        <h3 className="font-semibold">Add New Borrower</h3>
        <input className="input" placeholder="Name" value={newBorrower.name} onChange={e => setNewBorrower({ ...newBorrower, name: e.target.value })} />
        <input className="input" placeholder="Code" value={newBorrower.code} onChange={e => setNewBorrower({ ...newBorrower, code: e.target.value })} />
        <select className="input" value={newBorrower.role} onChange={e => setNewBorrower({ ...newBorrower, role: e.target.value })}>
          {['Student', 'Teacher', 'Support Staff', 'Leadership', 'Parent', 'Other'].map(r => <option key={r}>{r}</option>)}
        </select>
        <input className="input" placeholder="Year Level (optional)" value={newBorrower.yearLevel} onChange={e => setNewBorrower({ ...newBorrower, yearLevel: e.target.value })} />
        <Button type="submit">Add Borrower</Button>
      </form>
    </div>
  );
}
