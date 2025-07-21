export default function TaskList({ tasks, onDelete }) {
  return (
    <div className="space-y-4 mt-4">
      {tasks
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map(task => (
          <div
            key={task._id}
            className="p-4 bg-white shadow rounded-lg border-l-4 border-blue-400"
          >
            <h3 className="font-bold text-lg text-blue-700">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  task.priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {task.priority}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  task.status === 'Done'
                    ? 'bg-green-200 text-green-800'
                    : task.status === 'In Progress'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {task.status}
              </span>
            </div>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 text-xs mt-3 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}