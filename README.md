# FamBoard - Family Task Management App

A modern, intuitive task management application designed for families and small teams to organize, track, and collaborate on tasks together.

## 🚀 Features

- **Task Management**: Create, edit, and delete tasks with detailed descriptions
- **Priority System**: Set task priorities (Low, Medium, High) with visual indicators
- **Status Tracking**: Track task progress (To Do, In Progress, Done)
- **Due Date Management**: Set and track due dates with smart notifications
- **Team Assignment**: Assign tasks to family members or team members
- **Dual View Modes**: 
  - **List View**: Clean, organized task list with priority and status badges
  - **Calendar View**: Visual calendar representation of tasks
- **Smart Notifications**: Visual indicators for overdue tasks and due today items
- **User Management**: Add and manage team members
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FamBoard
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🎯 Usage

### Creating Tasks
1. Fill out the task form with title, description, and due date
2. Assign the task to a team member
3. Set priority level (Low, Medium, High)
4. Choose initial status (To Do, In Progress, Done)
5. Click "Create Task"

### Managing Tasks
- **List View**: See all tasks in a clean, organized list
- **Calendar View**: Visualize tasks on a calendar
- **Priority Indicators**: Color-coded priority badges
- **Status Tracking**: Update task status as work progresses
- **Due Date Alerts**: Visual indicators for overdue and due-today tasks

### Adding Team Members
1. Click "Add User" button
2. Enter the team member's name
3. Click "Add" to save

## 📁 Project Structure

```
FamBoard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API service functions
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── server/                # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   └── routes/            # API routes
└── README.md
```

## 🔧 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## 🎨 Key Features

### Smart Due Date Formatting
- "Due today" for same-day tasks
- "Due tomorrow" for next-day tasks
- "Due in X days" for upcoming tasks
- "X days overdue" for late tasks

### Visual Status Indicators
- **Overdue**: Red border and badge for overdue tasks
- **Due Today**: Amber border and badge for today's tasks
- **Completed**: Strikethrough text and reduced opacity

### Responsive Design
- Mobile-friendly interface
- Smooth hover animations
- Clean, modern UI with gradients

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Node.js
- Styled with Tailwind CSS
- Icons from Heroicons
- Database powered by MongoDB