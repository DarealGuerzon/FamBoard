import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
    const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'pending'
    });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6 mb-6">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-4">
       <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        </select>
        <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        </select>
      </div>
      <button
        className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}