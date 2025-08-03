import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskCalendar from '../components/TaskCalendar';
import { fetchTasks, createTask, deleteTask } from '../api/taskService';
import { fetchUsers, addUser } from '../api/userService';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('list');
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const loadTasks = async () => setTasks(await fetchTasks());
  const handleCreate = async (task) => { await createTask(task); loadTasks(); };
  const handleDelete = async (id) => { await deleteTask(id); loadTasks(); };
  
  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const handleAddUserClick = async () => {
    if (newUserName.trim()) {
      try {
        const newUser = await addUser(newUserName);
        setUsers(prev => [...prev, newUser]);
        setShowUserModal(false);
        setNewUserName('');
      } catch (error) {
        alert('Failed to add user');
      }
    }
  };

  useEffect(() => { 
    loadTasks();
    loadUsers();
  }, []);

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      <div className="flex justify-center gap-4 mb-4">
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
        <button
        onClick={() => setShowUserModal(true)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add User
      </button>
      </div>
      {showUserModal && (
       <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              placeholder="Enter user's name"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleAddUserClick}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <TaskForm onSubmit={handleCreate} users={users}  />
      {view === 'list'
        ? <TaskList tasks={tasks} onDelete={handleDelete} />
        : <TaskCalendar tasks={tasks} />
      }
    </div>
  );
}