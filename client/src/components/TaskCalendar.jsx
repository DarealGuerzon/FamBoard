import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TaskCalendar({ tasks }) {
  const [date, setDate] = useState(new Date());

  const dailyTasks = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === date.toDateString()
  );

  const getTasksForDate = (targetDate) => {
    return tasks.filter(
      (task) => new Date(task.dueDate).toDateString() === targetDate.toDateString()
    );
  };

  const getTileClassName = ({ date: tileDate, view }) => {
    if (view !== 'month') return '';
    
    const tasksForDate = getTasksForDate(tileDate);
    if (tasksForDate.length === 0) return '';

    const hasHighPriority = tasksForDate.some(task => task.priority === 'High');
    const hasOverdue = tasksForDate.some(task => 
      new Date(task.dueDate) < new Date() && 
      task.status !== 'Done' &&
      new Date(task.dueDate).toDateString() !== new Date().toDateString()
    );
    const isToday = tileDate.toDateString() === new Date().toDateString();

    if (hasOverdue) return 'task-tile-overdue';
    if (hasHighPriority) return 'task-tile-high';
    if (isToday) return 'task-tile-today';
    return 'task-tile-normal';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-400 bg-red-50';
      case 'Medium': return 'border-amber-400 bg-amber-50';
      default: return 'border-emerald-400 bg-emerald-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done': return '✅';
      case 'In Progress': return '⚡';
      default: return '📋';
    }
  };

  const formatSelectedDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Task Calendar
        </h2>
        <p className="text-blue-100 text-sm mt-1">Click on any date to view tasks</p>
      </div>

      <div className="p-6">
        {/* Custom Calendar Styles */}
        <style jsx>{`
          .react-calendar {
            width: 100%;
            background: white;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            font-family: inherit;
            line-height: 1.125em;
          }
          
          .react-calendar__navigation {
            display: flex;
            height: 60px;
            margin-bottom: 1em;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px 12px 0 0;
          }
          
          .react-calendar__navigation button {
            color: white;
            min-width: 44px;
            background: none;
            font-size: 16px;
            font-weight: 600;
            border: none;
            transition: all 0.2s;
          }
          
          .react-calendar__navigation button:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }
          
          .react-calendar__navigation button:disabled {
            opacity: 0.5;
          }
          
          .react-calendar__month-view__weekdays {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.75em;
            color: #6b7280;
            padding: 0.5rem 0;
          }
          
          .react-calendar__tile {
            max-width: 100%;
            padding: 12px 8px;
            background: none;
            text-align: center;
            line-height: 16px;
            font-size: 14px;
            font-weight: 500;
            border: none;
            border-radius: 8px;
            margin: 2px;
            transition: all 0.2s;
            position: relative;
          }
          
          .react-calendar__tile:hover {
            background-color: #e0e7ff;
            transform: scale(1.05);
          }
          
          .react-calendar__tile--active {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
            color: white;
            font-weight: 700;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
          
          .react-calendar__tile--now {
            background: #fef3c7;
            color: #92400e;
            font-weight: 700;
            border: 2px solid #f59e0b;
          }
          
          .task-tile-normal {
            background: #dbeafe !important;
            color: #1e40af;
            font-weight: 600;
          }
          
          .task-tile-normal::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background: #3b82f6;
            border-radius: 50%;
          }
          
          .task-tile-high {
            background: #fee2e2 !important;
            color: #dc2626;
            font-weight: 700;
          }
          
          .task-tile-high::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background: #dc2626;
            border-radius: 50%;
          }
          
          .task-tile-overdue {
            background: #fca5a5 !important;
            color: #991b1b;
            font-weight: 700;
            animation: pulse 2s infinite;
          }
          
          .task-tile-overdue::after {
            content: '!';
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            background: #991b1b;
            color: white;
            border-radius: 50%;
            font-size: 8px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .task-tile-today {
            background: #fef3c7 !important;
            color: #92400e;
            font-weight: 700;
            border: 2px solid #f59e0b;
          }
          
          .task-tile-today::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background: #f59e0b;
            border-radius: 50%;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>

        <Calendar
          onChange={setDate}
          value={date}
          className="mx-auto mb-8"
          tileClassName={getTileClassName}
        />

        {/* Selected Date Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {formatSelectedDate(date)}
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {dailyTasks.length} {dailyTasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>

          {dailyTasks.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No tasks scheduled</p>
              <p className="text-gray-400 text-sm">Enjoy your free time!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyTasks.map((task, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${getPriorityColor(task.priority)}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getStatusIcon(task.status)}</span>
                        <h4 className="font-semibold text-gray-900">{task.title}</h4>
                      </div>
                      {task.description && (
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="font-medium">
                          👤 {task.assignedTo?.name || 'Unassigned'}
                        </span>
                        <span className={`px-2 py-1 rounded-full font-medium ${
                          task.status === 'Done' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : task.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      task.priority === 'High' 
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Calendar Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-400 rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-gray-600">Has Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              </div>
              <span className="text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-300 rounded flex items-center justify-center text-white text-xs font-bold">!</div>
              <span className="text-gray-600">Overdue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}