export default function TaskList({ tasks, onDelete }) {
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isDueToday = (dueDate) => {
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Due yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="space-y-4 mt-6">
      {tasks
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map(task => (
          <div
            key={task._id}
            className={`group relative bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
              task.status === 'Done' ? 'opacity-75' : ''
            } ${
              isOverdue(task.dueDate) && task.status !== 'Done' 
                ? 'border-l-4 border-l-red-500 bg-red-50/30' 
                : isDueToday(task.dueDate) && task.status !== 'Done'
                ? 'border-l-4 border-l-amber-500 bg-amber-50/30'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title with status indicators */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={`font-semibold text-xl text-gray-900 ${
                      task.status === 'Done' ? 'line-through text-gray-500' : ''
                    }`}>
                      {task.title}
                    </h3>
                    
                    {/* Status badges */}
                    {(isOverdue(task.dueDate) && task.status !== 'Done') && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        Overdue
                      </span>
                    )}
                    {(isDueToday(task.dueDate) && task.status !== 'Done') && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                        Due Today
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed text-base">
                    {task.description}
                  </p>
                  
                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className={`font-medium ${
                        isOverdue(task.dueDate) && task.status !== 'Done' 
                          ? 'text-red-600' 
                          : isDueToday(task.dueDate) && task.status !== 'Done'
                          ? 'text-amber-600'
                          : 'text-gray-600'
                      }`}>
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 font-medium">
                        {task.assignedTo?.name || 'Unassigned'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Priority and Status badges + Actions */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-2">
                    {/* Priority badge */}
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${
                        task.priority === 'High'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : task.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {task.priority}
                    </span>
                    
                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${
                        task.status === 'Done'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-800 border-gray-300'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  
                  {/* Delete button */}
                  <button
                    onClick={() => onDelete(task._id)}
                    className="opacity-0 group-hover:opacity-100 p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                    title="Delete task"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}