const API_BASE = `${import.meta.env.VITE_API_URL}/api/users`;

export const fetchUsers = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const addUser = async (name) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return res.json();
};