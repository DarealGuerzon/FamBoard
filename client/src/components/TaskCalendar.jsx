import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TaskCalendar({ tasks }) {
  const [date, setDate] = useState(new Date());

  const dailyTasks = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === date.toDateString()
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Calendar
        onChange={setDate}
        value={date}
        className="mx-auto mb-6 border-0"
        tileClassName={({ date: d }) =>
          dailyTasks.some(task => new Date(task.dueDate).toDateString() === d.toDateString())
            ? 'bg-blue-100'
            : ''
        }
      />
      <div className="mt-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">
          Tasks on {date.toDateString()}:
        </h2>
        {dailyTasks.length === 0 ? (
          <div className="text-gray-400 italic ml-2">No tasks for this day.</div>
        ) : (
          <ul className="space-y-2">
            {dailyTasks.map((task, i) => (
              <li
                key={i}
                className="ml-2 px-3 py-2 bg-blue-50 rounded text-gray-800 border-l-4 border-blue-400"
              >
                • {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}