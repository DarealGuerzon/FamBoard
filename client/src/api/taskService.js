const API_BASE = `${import.meta.env.VITE_API_URL}/api/tasks`;

export const fetchTasks = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  return res.json();
};