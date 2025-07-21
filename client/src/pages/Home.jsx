import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskCalendar from '../components/TaskCalendar';
import { fetchTasks, createTask, deleteTask } from '../api/taskService';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('list');

  const loadTasks = async () => setTasks(await fetchTasks());
  const handleCreate = async (task) => { await createTask(task); loadTasks(); };
  const handleDelete = async (id) => { await deleteTask(id); loadTasks(); };

  useEffect(() => { loadTasks(); }, []);

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded font-semibold transition ${
            view === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded font-semibold transition ${
            view === 'calendar'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Calendar View
        </button>
      </div>
      
      <TaskForm onSubmit={handleCreate} />
      {view === 'list'
        ? <TaskList tasks={tasks} onDelete={handleDelete} />
        : <TaskCalendar tasks={tasks} />
      }
    </div>
  );
}