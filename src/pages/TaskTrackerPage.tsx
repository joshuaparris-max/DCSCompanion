import { useState } from 'react';
import { initialTasks } from '../data/taskTracker';
import type { TaskItem } from '../data/taskTracker';
import PageContainer from '../components/layout/PageContainer';

export default function TaskTrackerPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'ICT' | 'Library' | 'Admin'>('ICT');

  function toggleTask(id: string) {
    setTasks(tasks => tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function addTask() {
    if (!newTitle.trim()) return;
    setTasks(tasks => [
      ...tasks,
      {
        id: `${newCategory.toLowerCase()}-${Date.now()}`,
        title: newTitle,
        completed: false,
        category: newCategory,
      }
    ]);
    setNewTitle('');
  }

  return (
    <PageContainer title="ICT/Library Task Tracker">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">ICT/Library Task Tracker</h1>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="New task title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <select
            className="border rounded px-2 py-2"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value as any)}
          >
            <option value="ICT">ICT</option>
            <option value="Library">Library</option>
            <option value="Admin">Admin</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addTask}>Add</button>
        </div>
        <div className="grid gap-3">
          {tasks.map(task => (
            <div key={task.id} className={`flex items-center bg-white dark:bg-gray-100 rounded shadow p-3 ${task.completed ? 'opacity-60' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-3 w-5 h-5"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-900">{task.title}</div>
                {task.description && <div className="text-xs text-gray-700 dark:text-gray-700">{task.description}</div>}
                <div className="text-xs mt-1">
                  <span className={
                    task.category === 'ICT' ? 'bg-blue-100 text-blue-800 px-2 py-1 rounded' :
                    task.category === 'Library' ? 'bg-green-100 text-green-800 px-2 py-1 rounded' :
                    'bg-yellow-100 text-yellow-800 px-2 py-1 rounded'
                  }>{task.category}</span>
                  {task.dueDate && <span className="ml-2 text-gray-500">Due: {task.dueDate}</span>}
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && <div className="text-gray-500">No tasks yet.</div>}
        </div>
      </div>
    </PageContainer>
  );
}
